---
title: Vehicle
---

The vehicle module provides access to vehicle-specific functionality, allowing you to interact with and control various aspects of the vehicle your script is attached to. This includes reading vehicle state, controlling forces, and accessing information about the vehicle's interaction with the rail system.

## Global Vehicle Functions

The vehicle module provides several global functions to access vehicle state information:

```rust
use lotus_script::prelude::*;

// Get the vehicle's acceleration relative to the ground
let acceleration = vehicle::acceleration_vs_ground();
log::info!("Vehicle acceleration: {:?}", acceleration);

// Get the vehicle's velocity relative to the ground
let velocity = vehicle::velocity_vs_ground();
log::info!("Vehicle velocity: {:?}", velocity);

// Get pantograph height (for electric vehicles)
let pantograph_height = vehicle::pantograph_height();
log::info!("Pantograph height: {}", pantograph_height);

// Get pantograph voltage (for electric vehicles)
let pantograph_voltage = vehicle::pantograph_voltage();
log::info!("Pantograph voltage: {}", pantograph_voltage);
```

## Axle

An axle represents a single wheelset on a vehicle. Axles are grouped under bogies and provide fine-grained control over traction forces and access to rail quality information. Each axle can be accessed by specifying its bogie index and axle index within that bogie.

### Accessing Axles

```rust
let bogie_index = 0;
let axle_index = 0;

if let Ok(axle) = Axle::get(bogie_index, axle_index) {
  // Do something with the axle, like getting the rail quality of the rails under the axle
  let rail_quality = axle.rail_quality();
  log::info!("Rail quality under axle: {:?}", rail_quality);

  // Set the traction force in Newtons
  axle.set_traction_force_newton(1000.0);
}
```

### Rail Quality

The `rail_quality()` method returns information about the condition of the rails under the axle. This can be used to adjust vehicle behavior based on track conditions:

```rust
if let Ok(axle) = Axle::get(0, 0) {
  match axle.rail_quality() {
    RailQuality::Perfect => {
      // Optimal conditions - maximum performance
      axle.set_traction_force_newton(2000.0);
    },
    RailQuality::Good => {
      // Slightly reduced performance
      axle.set_traction_force_newton(1800.0);
    },
    RailQuality::Poor => {
      // Significantly reduced performance
      axle.set_traction_force_newton(1200.0);
    },
    RailQuality::Damaged => {
      // Minimal performance to prevent damage
      axle.set_traction_force_newton(500.0);
    }
  }
}
```

### Traction Force Control

Traction force represents the driving force applied by the axle to move the vehicle. Positive values accelerate the vehicle forward, while negative values provide regenerative braking:

```rust
if let Ok(axle) = Axle::get(0, 0) {
  // Apply forward traction (acceleration)
  axle.set_traction_force_newton(1500.0);

  // Apply regenerative braking (negative traction)
  axle.set_traction_force_newton(-800.0);

  // No traction force (coasting)
  axle.set_traction_force_newton(0.0);
}
```

## Bogie

A bogie (or truck) is a wheeled truck under a locomotive or railcar that provides support and guidance along the rails. Bogies contain one or more axles and provide higher-level control functions like braking.

### Accessing Bogies

```rust
let bogie_index = 0;

if let Ok(bogie) = Bogie::get(bogie_index) {
  // Set rail brake force in Newtons
  bogie.set_rail_brake_force_newton(2000.0);
}
```

### Rail Brake Control

Rail brakes are mechanical braking systems that apply friction directly to the rails. They provide additional stopping power beyond regenerative braking:

```rust
if let Ok(bogie) = Bogie::get(0) {
  // Apply maximum rail braking
  bogie.set_rail_brake_force_newton(3000.0);

  // Apply moderate rail braking
  bogie.set_rail_brake_force_newton(1500.0);

  // Release rail brakes
  bogie.set_rail_brake_force_newton(0.0);
}
```

## Error Handling

Both `Axle::get()` and `Bogie::get()` return `Result` types that can fail if the specified indices are invalid:

```rust
match Axle::get(bogie_index, axle_index) {
  Ok(axle) => {
    // Successfully got the axle
    axle.set_traction_force_newton(1000.0);
  },
  Err(VehicleError::InvalidBogie) => {
    log::error!("Invalid bogie index: {}", bogie_index);
  },
  Err(VehicleError::InvalidAxle) => {
    log::error!("Invalid axle index: {} for bogie {}", axle_index, bogie_index);
  },
  Err(e) => {
    log::error!("Vehicle error: {:?}", e);
  }
}
```

## Practical Examples

### Adaptive Traction Control

```rust
impl Script for MyScript {
  fn tick(&mut self) {
    let speed = vehicle::velocity_vs_ground();

    // Iterate through all axles on the first bogie
    for axle_index in 0..4 {
      if let Ok(axle) = Axle::get(0, axle_index) {
        let rail_quality = axle.rail_quality();

        // Adjust traction based on speed and rail quality
        let base_traction = if speed < 10.0 {
          2000.0 // High traction for starting
        } else if speed < 50.0 {
          1500.0 // Medium traction for acceleration
        } else {
          1000.0 // Lower traction at high speed
        };

        // Reduce traction on poor rails
        let adjusted_traction = match rail_quality {
          RailQuality::Perfect => base_traction,
          RailQuality::Good => base_traction * 0.9,
          RailQuality::Poor => base_traction * 0.7,
          RailQuality::Damaged => base_traction * 0.4,
        };

        axle.set_traction_force_newton(adjusted_traction);
      }
    }
  }
}
```

### Emergency Braking System

```rust
impl Script for MyScript {
  fn tick(&mut self) {
    let speed = vehicle::velocity_vs_ground();

    // Emergency braking if speed exceeds safe limit
    if speed > 80.0 {
      // Apply rail brakes on all bogies
      for bogie_index in 0..2 {
        if let Ok(bogie) = Bogie::get(bogie_index) {
          bogie.set_rail_brake_force_newton(5000.0);
        }
      }

      // Apply regenerative braking on all axles
      for bogie_index in 0..2 {
        for axle_index in 0..4 {
          if let Ok(axle) = Axle::get(bogie_index, axle_index) {
            axle.set_traction_force_newton(-2000.0);
          }
        }
      }

      log::warning!("Emergency braking activated! Speed: {:.1} km/h", speed * 3.6);
    }
  }
}
```

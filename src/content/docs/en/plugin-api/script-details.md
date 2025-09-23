---
title: GET /scripts/{id}
---

    GET http://localhost:3000/scripts/4294967358

```json
{
  "content_id": {
    "sub_id": 31997818,
    "user_id": 1000,
    "version": 44646.38152299768
  },
  "id": 4294967358,
  "logs": [
    {
      "level": "info",
      "message": "init -----------------------------",
      "timestamp": 1758653181028272
    },
    {
      "level": "info",
      "message": "is_coupled: false",
      "timestamp": 1758653181028286
    },
    {
      "level": "info",
      "message": "is_coupled: false",
      "timestamp": 1758653181028287
    },
    {
      "level": "info",
      "message": "cockpit index: None, module_slot_index: None, module_slot_in_class_index: None",
      "timestamp": 1758653181029533
    },
    {
      "level": "info",
      "message": "Message: Message { meta: MessageMeta { namespace: \"Std\", identifier: \"Batteryvoltage\", bus: None }, source: MessageSource { coupling: None, module_slot_index: None, module_slot_cockpit_index: None }, value: Object {\"On\": Number(1.0)} }",
      "timestamp": 1758653181030909
    },
    {
      "level": "info",
      "message": "Message: Message { meta: MessageMeta { namespace: \"Std\", identifier: \"PowerSignal\", bus: None }, source: MessageSource { coupling: None, module_slot_index: None, module_slot_cockpit_index: None }, value: Object {\"On\": Object {\"cabin_id\": String(\"ACab\"), \"quickstart\": Bool(false)}} }",
      "timestamp": 1758653181030915
    }
  ],
  "metrics": {
    "fontsCount": 0,
    "fontsTotalSize": 0,
    "lastMemorySize": 1376256,
    "lastUpdateTime": 0.000470911,
    "scriptTexturesCount": 1,
    "scriptTexturesTotalSize": 262144
  },
  "name": "GT6N",
  "textures": [],
  "variables": {
    "A_CP_FstBelBegleiter": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_FstBelMain": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_InstrBel": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_Richtungswender": {
      "type": "f64",
      "value": 29.0
    },
    "A_CP_SW_Aussenbel": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_SW_Blinker": {
      "type": "f64",
      "value": 1.0
    },
    "A_CP_SW_Fstbel": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_SW_Hauptschalter": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_SW_Innenbel": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_SW_Pantograph": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_SW_Sprechstelle": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_SW_Tueren": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_SW_Wischer": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_SW_Zugbildung": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_Sollwertgeber": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_Sollwertgeber_SiFa": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_TS_Fsp": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_TS_KiWa": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_TS_Klingel": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_TS_Lampentest": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_TS_MgBremse": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_TS_Rolli": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_TS_Sanden": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_TS_SiFa": {
      "type": "f64",
      "value": 0.0
    },
    "A_CP_TS_Warnblinker": {
      "type": "f64",
      "value": 0.0
    },
    "A_LM_BlinkerLinks": {
      "type": "f64",
      "value": 0.0
    },
    "A_LM_BlinkerRechts": {
      "type": "f64",
      "value": 0.0
    },
    "A_LM_DoorsClosed": {
      "type": "f64",
      "value": 1.0
    },
    "A_LM_FSp": {
      "type": "f64",
      "value": 0.0
    },
    "A_LM_Fernlicht": {
      "type": "f64",
      "value": 0.0
    },
    "A_LM_Haltewunsch": {
      "type": "f64",
      "value": 0.0
    },
    "A_LM_Hauptschalter": {
      "type": "f64",
      "value": 0.0
    },
    "A_LM_Kinderwagen": {
      "type": "f64",
      "value": 0.0
    },
    "A_LM_Notablegen": {
      "type": "f64",
      "value": 0.0
    },
    "A_LM_Notstart": {
      "type": "f64",
      "value": 0.0
    },
    "A_LM_Rollstuhl": {
      "type": "f64",
      "value": 0.0
    },
    "A_LM_Schienenbremse": {
      "type": "f64",
      "value": 0.0
    },
    "A_LM_Sifa": {
      "type": "f64",
      "value": 0.0
    },
    "A_LM_Sprechstelle": {
      "type": "f64",
      "value": 0.0
    },
    "A_LM_Warnblinken": {
      "type": "f64",
      "value": 0.0
    },
    "Abblendlicht": {
      "type": "f64",
      "value": 0.0
    },
    "B_CP_SW_Blinker": {
      "type": "f64",
      "value": 1.0
    },
    "B_CP_SW_Fahren": {
      "type": "f64",
      "value": -1.0
    },
    "B_CP_TS_Klingel": {
      "type": "f64",
      "value": 0.0
    },
    "B_CP_TS_Tuer4": {
      "type": "f64",
      "value": 0.0
    },
    "B_LM_BlinkerLinks": {
      "type": "f64",
      "value": 0.0
    },
    "B_LM_BlinkerRechts": {
      "type": "f64",
      "value": 0.0
    },
    "BlinkerLeft": {
      "type": "f64",
      "value": 0.0
    },
    "BlinkerRight": {
      "type": "f64",
      "value": 0.0
    },
    "Bremslicht": {
      "type": "f64",
      "value": 0.0
    },
    "Coupling_A_vis": {
      "type": "bool",
      "value": true
    },
    "Coupling_B_vis": {
      "type": "bool",
      "value": true
    },
    "Door_1_1": {
      "type": "f64",
      "value": 0.0
    },
    "Door_1_2": {
      "type": "f64",
      "value": -0.0
    },
    "Door_1_BtnLgt_Pressed": {
      "type": "bool",
      "value": false
    },
    "Door_1_R": {
      "type": "f64",
      "value": 0.0
    },
    "Door_1_WarnlightI": {
      "type": "f64",
      "value": 0.0
    },
    "Door_1_WarnlightO": {
      "type": "f64",
      "value": 0.0
    },
    "Door_234_WarnlightO": {
      "type": "f64",
      "value": 0.0
    },
    "Door_2_1": {
      "type": "f64",
      "value": 0.0
    },
    "Door_2_2": {
      "type": "f64",
      "value": -0.0
    },
    "Door_2_BtnLgt_Pressed": {
      "type": "bool",
      "value": false
    },
    "Door_2_R": {
      "type": "f64",
      "value": 0.0
    },
    "Door_2_WarnlightI": {
      "type": "f64",
      "value": 0.0
    },
    "Door_3_1": {
      "type": "f64",
      "value": 0.0
    },
    "Door_3_2": {
      "type": "f64",
      "value": -0.0
    },
    "Door_3_BtnLgt_Pressed": {
      "type": "bool",
      "value": false
    },
    "Door_3_R": {
      "type": "f64",
      "value": 0.0
    },
    "Door_3_WarnlightI": {
      "type": "f64",
      "value": 0.0
    },
    "Door_4_1": {
      "type": "f64",
      "value": 0.0
    },
    "Door_4_2": {
      "type": "f64",
      "value": -0.0
    },
    "Door_4_BtnLgt_Pressed": {
      "type": "bool",
      "value": false
    },
    "Door_4_R": {
      "type": "f64",
      "value": 0.0
    },
    "Door_BtnLgt_Frei": {
      "type": "bool",
      "value": false
    },
    "Fahrgastraumbeleuchtung": {
      "type": "f64",
      "value": 0.0
    },
    "Fernlicht": {
      "type": "f64",
      "value": 0.0
    },
    "NightTex": {
      "type": "i64",
      "value": 1073741824
    },
    "Rueckfahrlicht": {
      "type": "f64",
      "value": 0.0
    },
    "Ruecklicht": {
      "type": "f64",
      "value": 0.0
    },
    "Schluessel_A_RW": {
      "type": "bool",
      "value": true
    },
    "Schluessel_A_RW_turned": {
      "type": "f64",
      "value": 1.0
    },
    "Schluessel_H": {
      "type": "bool",
      "value": false
    },
    "Schluessel_H_turned": {
      "type": "f64",
      "value": 0.0
    },
    "Snd_BrakeFlirr": {
      "type": "f64",
      "value": 0.0
    },
    "Snd_Mg_A_Friction_vol": {
      "type": "f64",
      "value": -0.5
    },
    "Snd_Mg_B_Friction_vol": {
      "type": "f64",
      "value": -0.5
    },
    "Snd_Mg_C_Friction_vol": {
      "type": "f64",
      "value": -0.5
    },
    "Snd_Mg_Friction_pitch": {
      "type": "f64",
      "value": 0.800000011920929
    },
    "Snd_Rumpeln_Pitch": {
      "type": "f64",
      "value": 0.8999999761581421
    },
    "Snd_Rumpeln_Weiche1": {
      "type": "f64",
      "value": 0.0
    },
    "Snd_Traction_A": {
      "type": "f64",
      "value": 0.0
    },
    "Snd_Traction_B": {
      "type": "f64",
      "value": 0.0
    },
    "Snd_Traction_C": {
      "type": "f64",
      "value": 0.0
    },
    "Standlicht": {
      "type": "f64",
      "value": 0.0
    },
    "StreetLightsOn": {
      "type": "f64",
      "value": 0.0
    },
    "ZStellung_A": {
      "type": "f64",
      "value": -0.003794431686401367
    },
    "ZStellung_B": {
      "type": "f64",
      "value": 0.0027213096618652344
    },
    "ZStellung_C": {
      "type": "f64",
      "value": -0.0011503163259476423
    },
    "invradius_abs_max": {
      "type": "f64",
      "value": 0.0
    },
    "loadforce_Axle_N_1_1": {
      "type": "f64",
      "value": 100000000.0
    },
    "panto_0": {
      "type": "f64",
      "value": 10.0
    },
    "panto_voltage_0": {
      "type": "bool",
      "value": true
    },
    "sanding_0_1": {
      "type": "bool",
      "value": false
    },
    "sanding_1_1": {
      "type": "bool",
      "value": false
    },
    "sanding_2_0": {
      "type": "bool",
      "value": false
    },
    "v_Axle_mps_0_0": {
      "type": "f64",
      "value": 0.0
    },
    "v_Axle_mps_0_0_abs": {
      "type": "f64",
      "value": 0.0
    },
    "v_Axle_mps_0_1": {
      "type": "f64",
      "value": 0.0
    },
    "v_Axle_mps_0_1_abs": {
      "type": "f64",
      "value": 0.0
    },
    "v_Axle_mps_1_0": {
      "type": "f64",
      "value": 0.0
    },
    "v_Axle_mps_1_1": {
      "type": "f64",
      "value": 0.0
    },
    "v_Axle_mps_2_0": {
      "type": "f64",
      "value": 0.0
    },
    "v_Axle_mps_2_0_abs": {
      "type": "f64",
      "value": 0.0
    },
    "v_Axle_mps_2_1": {
      "type": "f64",
      "value": 0.0
    },
    "v_Axle_mps_2_1_abs": {
      "type": "f64",
      "value": 0.0
    },
    "v_ground": {
      "type": "f64",
      "value": 0.0
    },
    "veh_number": {
      "type": "string",
      "value": "2143"
    }
  }
}
```

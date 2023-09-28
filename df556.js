const utility = require('./utility'); // You need to import the utility module if it's in a separate file.
const attr_result = {};
let token_id = '';

function parse_data_DF556(req_data) {
  try {
    const data_type = req_data.slice(6, 8);
    const data_len = parseInt(req_data.slice(8, 10), 16);

    if (data_len === req_data.length / 2) {
      if (data_type === '01' || data_type === '02') {
        if (data_len === 30) {
          token_id = req_data.slice(43, 58);
          const data_height = parseInt(req_data.slice(10, 14), 16);
          const data_gps_enabled = parseInt(req_data.slice(14, 16), 16);
          const data_empty_alarm = parseInt(req_data.slice(22, 23), 16);
          const data_battery_alarm = parseInt(req_data.slice(25, 26), 16);
          const data_volt = parseInt(req_data.slice(26, 30), 16) / 100;
          const data_rsrp_origin = req_data.slice(30, 38);
          const data_rsrp = parseFloat(utility.IEEE754_Hex_To_Float(data_rsrp_origin));
          const data_frame_counter = parseInt(req_data.slice(54, 58), 16);

          attr_result.height = data_height;
          attr_result.gps_enabled = data_gps_enabled;
          attr_result.empty_alarm = data_empty_alarm;
          attr_result.battery_alarm = data_battery_alarm;
          attr_result.volt = data_volt;
          attr_result.rsrp = data_rsrp;
          attr_result.frame_counter = data_frame_counter;
        } else if (data_len === 38) {
          token_id = req_data.slice(59, 74);
          const data_height = parseInt(req_data.slice(10, 14), 16);
          const data_gps_enabled = parseInt(req_data.slice(14, 16), 16);
          const data_longitude_origin = req_data.slice(16, 24);
          const data_longitude = parseFloat(utility.IEEE754_Hex_To_Float(data_longitude_origin)).toFixed(6);
          const data_latitude_origin = req_data.slice(24, 32);
          const data_latitude = parseFloat(utility.IEEE754_Hex_To_Float(data_latitude_origin)).toFixed(6);
          const data_empty_alarm = parseInt(req_data.slice(38, 39), 16);
          const data_battery_alarm = parseInt(req_data.slice(41, 42), 16);
          const data_volt = parseInt(req_data.slice(42, 46), 16) / 100;
          const data_rsrp_origin = req_data.slice(46, 54);
          const data_rsrp = parseFloat(utility.IEEE754_Hex_To_Float(data_rsrp_origin));
          const data_frame_counter = parseInt(req_data.slice(70, 74), 16);

          attr_result.height = data_height;
          attr_result.gps_enabled = data_gps_enabled;
          attr_result.longitude = data_longitude;
          attr_result.latitude = data_latitude;
          attr_result.empty_alarm = data_empty_alarm;
          attr_result.battery_alarm = data_battery_alarm;
          attr_result.volt = data_volt;
          attr_result.rsrp = data_rsrp;
          attr_result.frame_counter = data_frame_counter;
        } else {
          attr_result = {};
        }
      } else if (data_len === 32) {
        token_id = req_data.slice(data_len * 2 - 17, -2);
        const data_firmware_version = parseInt(req_data.slice(10, 12), 16) + '.' + parseInt(req_data.slice(12, 14), 16);
        const data_upload_interval = parseInt(req_data.slice(14, 18), 16);
        const data_detect_interval = parseInt(req_data.slice(18, 20), 16);
        const data_height_threshold = parseInt(req_data.slice(20, 22), 16);
        const data_battery_threshold = parseInt(req_data.slice(26, 28), 16);
        const data_imsi = req_data.slice(29, 44);
        const data_work_mode = parseInt(req_data.slice(44, 46), 16);

        attr_result.firmware_version = data_firmware_version;
        attr_result.upload_interval = data_upload_interval;
        attr_result.detect_interval = data_detect_interval;
        attr_result.height_threshold = data_height_threshold;
        attr_result.battery_threshold = data_battery_threshold;
        attr_result.imsi = data_imsi;
        attr_result.work_mode = data_work_mode;
      } else {
        attr_result = {};
      }
    } else {
      attr_result = {};
      token_id = '';
    }
  } catch (e) {
    console.error(e);
  } finally {
    return JSON.stringify(attr_result);
  }
}

// Example usage:
// const req_data = "800016022101656000000000000168008045C41865385060029872000181";
// const result = parse_data_DF556(req_data);
// console.log("RES/"+result);

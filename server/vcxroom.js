/// ////////////////////////////////////////////////////
//
// File: vcxroom.js
// This file does RestAPI Call to communicate with EnableX Server API
//
/// //////////////////////////////////////////////////

const fs = require('fs');
const vcxconfig = require('./vcxconfig');
const vcxutil = require('./vcxutil');

const vcxroom = {};

const obj = {
  name: 'test Room',
  owner_ref: 'xdada',
  settings: {
    description: '',
    scheduled: false,
    scheduled_time: '',
    participants: '6',
    duration: '60',
    auto_recording: false,
    active_talker: true,
    wait_moderator: false,
    quality: 'SD',
    adhoc: false,
    mode: 'group',
  },
  sip: {
    enabled: false,
  },
};

// room object for creating room with multi party calling
const multiPartyRoomObj = {
  name: 'room for multiparty video meeting',
  owner_ref: 'multiparty github sample',
  settings: {
    scheduled: false,
    adhoc: true,
    moderators: '1',
    participants: '5',
    duration: '30',
    quality: 'SD',
    auto_recording: false,
  },
};

// HTTP Request Header Creation
const { port } = vcxconfig.SERVER_API_SERVER;
const options = {
  host: vcxconfig.SERVER_API_SERVER.host,
  key: fs.readFileSync(vcxconfig.Certificate.ssl_key).toString(),
  cert: fs.readFileSync(vcxconfig.Certificate.ssl_cert).toString(),
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${vcxutil.getBasicAuthToken()}`,
  },
};

if (port.trim() != '' && port !== undefined) {
  options.port = port;
}

// Function: To get Token for a Room

vcxroom.getToken = (details, callback) => {
  options.path = `/v1/rooms/${details.roomId}/tokens`;
  options.method = 'POST';
  options.headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${vcxutil.getBasicAuthToken()}`,
  };

  vcxutil.connectServer(options, JSON.stringify(details), (status, data) => {
    if (status === 'success') callback(status, data);
    else if (status === 'error') callback(status, data);
  });
};

// Function: To get a list of Rooms

vcxroom.getAllRooms = (callback) => {
  options.path = '/v1/rooms/';
  options.method = 'GET';
  vcxutil.connectServer(options, null, (status, data) => {
    callback(data);
  });
};

// Function: To get information of a Room

vcxroom.getRoom = (roomName, callback) => {
  options.path = `/v1/rooms/${roomName}`;
  options.method = 'GET';
  vcxutil.connectServer(options, null, (status, data) => {
    if (status === 'success') callback(status, data);
    else if (status === 'error') callback(status, data);
  });
};

vcxroom.createRoom = (callback) => {
  const roomMeta = obj;
  options.path = '/v1/rooms/';
  options.method = 'POST';
  options.headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${vcxutil.getBasicAuthToken()}`,
  };
  vcxutil.connectServer(options, JSON.stringify(roomMeta), (status, data) => {
    if (status === 'success') callback(status, data);
    else if (status === 'error') callback(status, data);
  });
};

// Function: To create Room
vcxroom.createRoomMulti = function createRoom(callback) {
  const roomMeta = multiPartyRoomObj;
  options.path = '/v1/rooms/';
  options.method = 'POST';
  options.headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${vcxutil.getBasicAuthToken()}`,
  };
  vcxutil.connectServer(options, JSON.stringify(roomMeta), (status, data) => {
    if (status === 'success') {
      callback(status, data);
    } else if (status === 'error') {
      callback(status, data);
    }
  });
};

module.exports = vcxroom;

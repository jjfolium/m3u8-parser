(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _lineStream = require('./line-stream');

var _lineStream2 = _interopRequireDefault(_lineStream);

var _parseStream = require('./parse-stream');

var _parseStream2 = _interopRequireDefault(_parseStream);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

module.exports = {
  LineStream: _lineStream2['default'],
  ParseStream: _parseStream2['default'],
  Parser: _parser2['default']
}; /**
    * @file m3u8/index.js
    *
    * Utilities for parsing M3U8 files. If the entire manifest is available,
    * `Parser` will create an object representation with enough detail for managing
    * playback. `ParseStream` and `LineStream` are lower-level parsing primitives
    * that do not assume the entirety of the manifest is ready and expose a
    * ReadableStream-like interface.
    */

},{"./line-stream":2,"./parse-stream":3,"./parser":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file m3u8/line-stream.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * A stream that buffers string input and generates a `data` event for each
 * line.
 *
 * @class LineStream
 * @extends Stream
 */
var LineStream = function (_Stream) {
  _inherits(LineStream, _Stream);

  function LineStream() {
    _classCallCheck(this, LineStream);

    var _this = _possibleConstructorReturn(this, (LineStream.__proto__ || Object.getPrototypeOf(LineStream)).call(this));

    _this.buffer = '';
    return _this;
  }

  /**
   * Add new data to be parsed.
   *
   * @param {String} data the text to process
   */


  _createClass(LineStream, [{
    key: 'push',
    value: function push(data) {
      var nextNewline = void 0;

      this.buffer += data;
      nextNewline = this.buffer.indexOf('\n');

      for (; nextNewline > -1; nextNewline = this.buffer.indexOf('\n')) {
        this.trigger('data', this.buffer.substring(0, nextNewline));
        this.buffer = this.buffer.substring(nextNewline + 1);
      }
    }
  }]);

  return LineStream;
}(_stream2['default']);

exports['default'] = LineStream;

},{"./stream":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file m3u8/parse-stream.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * "forgiving" attribute list psuedo-grammar:
 * attributes -> keyvalue (',' keyvalue)*
 * keyvalue   -> key '=' value
 * key        -> [^=]*
 * value      -> '"' [^"]* '"' | [^,]*
 */
var attributeSeparator = function attributeSeparator() {
  var key = '[^=]*';
  var value = '"[^"]*"|[^,]*';
  var keyvalue = '(?:' + key + ')=(?:' + value + ')';

  return new RegExp('(?:^|,)(' + keyvalue + ')');
};

/**
 * Parse attributes from a line given the seperator
 *
 * @param {String} attributes the attibute line to parse
 */
var parseAttributes = function parseAttributes(attributes) {
  // split the string using attributes as the separator
  var attrs = attributes.split(attributeSeparator());
  var result = {};
  var i = attrs.length;
  var attr = void 0;

  while (i--) {
    // filter out unmatched portions of the string
    if (attrs[i] === '') {
      continue;
    }

    // split the key and value
    attr = /([^=]*)=(.*)/.exec(attrs[i]).slice(1);
    // trim whitespace and remove optional quotes around the value
    attr[0] = attr[0].replace(/^\s+|\s+$/g, '');
    attr[1] = attr[1].replace(/^\s+|\s+$/g, '');
    attr[1] = attr[1].replace(/^['"](.*)['"]$/g, '$1');
    result[attr[0]] = attr[1];
  }
  return result;
};

/**
 * A line-level M3U8 parser event stream. It expects to receive input one
 * line at a time and performs a context-free parse of its contents. A stream
 * interpretation of a manifest can be useful if the manifest is expected to
 * be too large to fit comfortably into memory or the entirety of the input
 * is not immediately available. Otherwise, it's probably much easier to work
 * with a regular `Parser` object.
 *
 * Produces `data` events with an object that captures the parser's
 * interpretation of the input. That object has a property `tag` that is one
 * of `uri`, `comment`, or `tag`. URIs only have a single additional
 * property, `line`, which captures the entirety of the input without
 * interpretation. Comments similarly have a single additional property
 * `text` which is the input without the leading `#`.
 *
 * Tags always have a property `tagType` which is the lower-cased version of
 * the M3U8 directive without the `#EXT` or `#EXT-X-` prefix. For instance,
 * `#EXT-X-MEDIA-SEQUENCE` becomes `media-sequence` when parsed. Unrecognized
 * tags are given the tag type `unknown` and a single additional property
 * `data` with the remainder of the input.
 *
 * @class ParseStream
 * @extends Stream
 */

var ParseStream = function (_Stream) {
  _inherits(ParseStream, _Stream);

  function ParseStream() {
    _classCallCheck(this, ParseStream);

    return _possibleConstructorReturn(this, (ParseStream.__proto__ || Object.getPrototypeOf(ParseStream)).call(this));
  }

  /**
   * Parses an additional line of input.
   *
   * @param {String} line a single line of an M3U8 file to parse
   */


  _createClass(ParseStream, [{
    key: 'push',
    value: function push(line) {
      var match = void 0;
      var event = void 0;

      // strip whitespace
      line = line.replace(/^[\u0000\s]+|[\u0000\s]+$/g, '');
      if (line.length === 0) {
        // ignore empty lines
        return;
      }

      // URIs
      if (line[0] !== '#') {
        this.trigger('data', {
          type: 'uri',
          uri: line
        });
        return;
      }

      // Comments
      if (line.indexOf('#EXT') !== 0) {
        this.trigger('data', {
          type: 'comment',
          text: line.slice(1)
        });
        return;
      }

      // strip off any carriage returns here so the regex matching
      // doesn't have to account for them.
      line = line.replace('\r', '');

      // Tags
      match = /^#EXTM3U/.exec(line);
      if (match) {
        this.trigger('data', {
          type: 'tag',
          tagType: 'm3u'
        });
        return;
      }
      match = /^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'inf'
        };
        if (match[1]) {
          event.duration = parseFloat(match[1]);
        }
        if (match[2]) {
          event.title = match[2];
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'targetduration'
        };
        if (match[1]) {
          event.duration = parseInt(match[1], 10);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#ZEN-TOTAL-DURATION:?([0-9.]*)?/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'totalduration'
        };
        if (match[1]) {
          event.duration = parseInt(match[1], 10);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-VERSION:?([0-9.]*)?/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'version'
        };
        if (match[1]) {
          event.version = parseInt(match[1], 10);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'media-sequence'
        };
        if (match[1]) {
          event.number = parseInt(match[1], 10);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'discontinuity-sequence'
        };
        if (match[1]) {
          event.number = parseInt(match[1], 10);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'playlist-type'
        };
        if (match[1]) {
          event.playlistType = match[1];
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-BYTERANGE:?([0-9.]*)?@?([0-9.]*)?/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'byterange'
        };
        if (match[1]) {
          event.length = parseInt(match[1], 10);
        }
        if (match[2]) {
          event.offset = parseInt(match[2], 10);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'allow-cache'
        };
        if (match[1]) {
          event.allowed = !/NO/.test(match[1]);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-MAP:?(.*)$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'map'
        };

        if (match[1]) {
          var attributes = parseAttributes(match[1]);

          if (attributes.URI) {
            event.uri = attributes.URI;
          }
          if (attributes.BYTERANGE) {
            var _attributes$BYTERANGE = attributes.BYTERANGE.split('@'),
                _attributes$BYTERANGE2 = _slicedToArray(_attributes$BYTERANGE, 2),
                length = _attributes$BYTERANGE2[0],
                offset = _attributes$BYTERANGE2[1];

            event.byterange = {};
            if (length) {
              event.byterange.length = parseInt(length, 10);
            }
            if (offset) {
              event.byterange.offset = parseInt(offset, 10);
            }
          }
        }

        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-STREAM-INF:?(.*)$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'stream-inf'
        };
        if (match[1]) {
          event.attributes = parseAttributes(match[1]);

          if (event.attributes.RESOLUTION) {
            var split = event.attributes.RESOLUTION.split('x');
            var resolution = {};

            if (split[0]) {
              resolution.width = parseInt(split[0], 10);
            }
            if (split[1]) {
              resolution.height = parseInt(split[1], 10);
            }
            event.attributes.RESOLUTION = resolution;
          }
          if (event.attributes.BANDWIDTH) {
            event.attributes.BANDWIDTH = parseInt(event.attributes.BANDWIDTH, 10);
          }
          if (event.attributes['PROGRAM-ID']) {
            event.attributes['PROGRAM-ID'] = parseInt(event.attributes['PROGRAM-ID'], 10);
          }
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-MEDIA:?(.*)$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'media'
        };
        if (match[1]) {
          event.attributes = parseAttributes(match[1]);
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-ENDLIST/.exec(line);
      if (match) {
        this.trigger('data', {
          type: 'tag',
          tagType: 'endlist'
        });
        return;
      }
      match = /^#EXT-X-DISCONTINUITY/.exec(line);
      if (match) {
        this.trigger('data', {
          type: 'tag',
          tagType: 'discontinuity'
        });
        return;
      }
      match = /^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'program-date-time'
        };
        if (match[1]) {
          event.dateTimeString = match[1];
          event.dateTimeObject = new Date(match[1]);
          event.startTime = event.dateTimeObject;
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-KEY:?(.*)$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'key'
        };
        if (match[1]) {
          event.attributes = parseAttributes(match[1]);
          // parse the IV string into a Uint32Array
          if (event.attributes.IV) {
            if (event.attributes.IV.substring(0, 2).toLowerCase() === '0x') {
              event.attributes.IV = event.attributes.IV.substring(2);
            }

            event.attributes.IV = event.attributes.IV.match(/.{8}/g);
            event.attributes.IV[0] = parseInt(event.attributes.IV[0], 16);
            event.attributes.IV[1] = parseInt(event.attributes.IV[1], 16);
            event.attributes.IV[2] = parseInt(event.attributes.IV[2], 16);
            event.attributes.IV[3] = parseInt(event.attributes.IV[3], 16);
            event.attributes.IV = new Uint32Array(event.attributes.IV);
          }
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-out-cont'
        };
        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-CUE-OUT:?(.*)?$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-out'
        };
        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }
        this.trigger('data', event);
        return;
      }
      match = /^#EXT-X-CUE-IN:?(.*)?$/.exec(line);
      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-in'
        };
        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }
        this.trigger('data', event);
        return;
      }

      // unknown tag type
      this.trigger('data', {
        type: 'tag',
        data: line.slice(4)
      });
    }
  }]);

  return ParseStream;
}(_stream2['default']);

exports['default'] = ParseStream;

},{"./stream":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

var _lineStream = require('./line-stream');

var _lineStream2 = _interopRequireDefault(_lineStream);

var _parseStream = require('./parse-stream');

var _parseStream2 = _interopRequireDefault(_parseStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file m3u8/parser.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * A parser for M3U8 files. The current interpretation of the input is
 * exposed as a property `manifest` on parser objects. It's just two lines to
 * create and parse a manifest once you have the contents available as a string:
 *
 * ```js
 * var parser = new m3u8.Parser();
 * parser.push(xhr.responseText);
 * ```
 *
 * New input can later be applied to update the manifest object by calling
 * `push` again.
 *
 * The parser attempts to create a usable manifest object even if the
 * underlying input is somewhat nonsensical. It emits `info` and `warning`
 * events during the parse if it encounters input that seems invalid or
 * requires some property of the manifest object to be defaulted.
 *
 * @class Parser
 * @extends Stream
 */
var Parser = function (_Stream) {
  _inherits(Parser, _Stream);

  function Parser() {
    _classCallCheck(this, Parser);

    var _this = _possibleConstructorReturn(this, (Parser.__proto__ || Object.getPrototypeOf(Parser)).call(this));

    _this.lineStream = new _lineStream2['default']();
    _this.parseStream = new _parseStream2['default']();
    _this.lineStream.pipe(_this.parseStream);
    /* eslint-disable consistent-this */
    var self = _this;
    /* eslint-enable consistent-this */
    var uris = [];
    var currentUri = {};
    // if specified, the active EXT-X-MAP definition
    var currentMap = void 0;
    // if specified, the active decryption key
    var _key = void 0;
    var noop = function noop() {};
    var defaultMediaGroups = {
      'AUDIO': {},
      'VIDEO': {},
      'CLOSED-CAPTIONS': {},
      'SUBTITLES': {}
    };
    // group segments into numbered timelines delineated by discontinuities
    var currentTimeline = 0;

    // the manifest is empty until the parse stream begins delivering data
    _this.manifest = {
      allowCache: true,
      discontinuityStarts: [],
      segments: []
    };

    // update the manifest with the m3u8 entry from the parse stream
    _this.parseStream.on('data', function (entry) {
      var mediaGroup = void 0;
      var rendition = void 0;

      ({
        tag: function tag() {
          // switch based on the tag type
          (({
            'allow-cache': function allowCache() {
              this.manifest.allowCache = entry.allowed;
              if (!('allowed' in entry)) {
                this.trigger('info', {
                  message: 'defaulting allowCache to YES'
                });
                this.manifest.allowCache = true;
              }
            },
            byterange: function byterange() {
              var byterange = {};

              if ('length' in entry) {
                currentUri.byterange = byterange;
                byterange.length = entry.length;

                if (!('offset' in entry)) {
                  this.trigger('info', {
                    message: 'defaulting offset to zero'
                  });
                  entry.offset = 0;
                }
              }
              if ('offset' in entry) {
                currentUri.byterange = byterange;
                byterange.offset = entry.offset;
              }
            },
            endlist: function endlist() {
              this.manifest.endList = true;
            },
            inf: function inf() {
              if (!('mediaSequence' in this.manifest)) {
                this.manifest.mediaSequence = 0;
                this.trigger('info', {
                  message: 'defaulting media sequence to zero'
                });
              }
              if (!('discontinuitySequence' in this.manifest)) {
                this.manifest.discontinuitySequence = 0;
                this.trigger('info', {
                  message: 'defaulting discontinuity sequence to zero'
                });
              }
              if (entry.duration > 0) {
                currentUri.duration = entry.duration;
              }

              if (entry.duration === 0) {
                currentUri.duration = 0.01;
                this.trigger('info', {
                  message: 'updating zero segment duration to a small value'
                });
              }

              this.manifest.segments = uris;
            },
            key: function key() {
              if (!entry.attributes) {
                this.trigger('warn', {
                  message: 'ignoring key declaration without attribute list'
                });
                return;
              }
              // clear the active encryption key
              if (entry.attributes.METHOD === 'NONE') {
                _key = null;
                return;
              }
              if (!entry.attributes.URI) {
                this.trigger('warn', {
                  message: 'ignoring key declaration without URI'
                });
                return;
              }
              if (!entry.attributes.METHOD) {
                this.trigger('warn', {
                  message: 'defaulting key method to AES-128'
                });
              }

              // setup an encryption key for upcoming segments
              _key = {
                method: entry.attributes.METHOD || 'AES-128',
                uri: entry.attributes.URI
              };

              if (typeof entry.attributes.IV !== 'undefined') {
                _key.iv = entry.attributes.IV;
              }
            },
            'media-sequence': function mediaSequence() {
              if (!isFinite(entry.number)) {
                this.trigger('warn', {
                  message: 'ignoring invalid media sequence: ' + entry.number
                });
                return;
              }
              this.manifest.mediaSequence = entry.number;
            },
            'discontinuity-sequence': function discontinuitySequence() {
              if (!isFinite(entry.number)) {
                this.trigger('warn', {
                  message: 'ignoring invalid discontinuity sequence: ' + entry.number
                });
                return;
              }
              this.manifest.discontinuitySequence = entry.number;
              currentTimeline = entry.number;
            },
            'playlist-type': function playlistType() {
              if (!/VOD|EVENT/.test(entry.playlistType)) {
                this.trigger('warn', {
                  message: 'ignoring unknown playlist type: ' + entry.playlist
                });
                return;
              }
              this.manifest.playlistType = entry.playlistType;
            },
            map: function map() {
              currentMap = {};
              if (entry.uri) {
                currentMap.uri = entry.uri;
              }
              if (entry.byterange) {
                currentMap.byterange = entry.byterange;
              }
            },
            'stream-inf': function streamInf() {
              this.manifest.playlists = uris;
              this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;

              if (!entry.attributes) {
                this.trigger('warn', {
                  message: 'ignoring empty stream-inf attributes'
                });
                return;
              }

              if (!currentUri.attributes) {
                currentUri.attributes = {};
              }
              _extends(currentUri.attributes, entry.attributes);
            },
            media: function media() {
              this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;

              if (!(entry.attributes && entry.attributes.TYPE && entry.attributes['GROUP-ID'] && entry.attributes.NAME)) {
                this.trigger('warn', {
                  message: 'ignoring incomplete or missing media group'
                });
                return;
              }

              // find the media group, creating defaults as necessary
              var mediaGroupType = this.manifest.mediaGroups[entry.attributes.TYPE];

              mediaGroupType[entry.attributes['GROUP-ID']] = mediaGroupType[entry.attributes['GROUP-ID']] || {};
              mediaGroup = mediaGroupType[entry.attributes['GROUP-ID']];

              // collect the rendition metadata
              rendition = {
                'default': /yes/i.test(entry.attributes.DEFAULT)
              };
              if (rendition['default']) {
                rendition.autoselect = true;
              } else {
                rendition.autoselect = /yes/i.test(entry.attributes.AUTOSELECT);
              }
              if (entry.attributes.LANGUAGE) {
                rendition.language = entry.attributes.LANGUAGE;
              }
              if (entry.attributes.URI) {
                rendition.uri = entry.attributes.URI;
              }
              if (entry.attributes['INSTREAM-ID']) {
                rendition.instreamId = entry.attributes['INSTREAM-ID'];
              }
              if (entry.attributes.CHARACTERISTICS) {
                rendition.characteristics = entry.attributes.CHARACTERISTICS;
              }
              if (entry.attributes.FORCED) {
                rendition.forced = /yes/i.test(entry.attributes.FORCED);
              }

              // insert the new rendition
              mediaGroup[entry.attributes.NAME] = rendition;
            },
            discontinuity: function discontinuity() {
              currentTimeline += 1;
              currentUri.discontinuity = true;
              this.manifest.discontinuityStarts.push(uris.length);
            },
            'program-date-time': function programDateTime() {
              currentUri.startTime = entry.startTime;
              this.manifest.dateTimeString = entry.dateTimeString;
              this.manifest.dateTimeObject = entry.dateTimeObject;
            },
            targetduration: function targetduration() {
              if (!isFinite(entry.duration) || entry.duration < 0) {
                this.trigger('warn', {
                  message: 'ignoring invalid target duration: ' + entry.duration
                });
                return;
              }
              this.manifest.targetDuration = entry.duration;
            },
            totalduration: function totalduration() {
              if (!isFinite(entry.duration) || entry.duration < 0) {
                this.trigger('warn', {
                  message: 'ignoring invalid total duration: ' + entry.duration
                });
                return;
              }
              this.manifest.totalDuration = entry.duration;
            },
            'cue-out': function cueOut() {
              currentUri.cueOut = entry.data;
            },
            'cue-out-cont': function cueOutCont() {
              currentUri.cueOutCont = entry.data;
            },
            'cue-in': function cueIn() {
              currentUri.cueIn = entry.data;
            }
          })[entry.tagType] || noop).call(self);
        },
        uri: function uri() {
          currentUri.uri = entry.uri;
          uris.push(currentUri);

          // if no explicit duration was declared, use the target duration
          if (this.manifest.targetDuration && !('duration' in currentUri)) {
            this.trigger('warn', {
              message: 'defaulting segment duration to the target duration'
            });
            currentUri.duration = this.manifest.targetDuration;
          }
          // annotate with encryption information, if necessary
          if (_key) {
            currentUri.key = _key;
          }
          currentUri.timeline = currentTimeline;
          // annotate with initialization segment information, if necessary
          if (currentMap) {
            currentUri.map = currentMap;
          }

          // prepare for the next URI
          currentUri = {};
        },
        comment: function comment() {
          // comments are not important for playback
        }
      })[entry.type].call(self);
    });

    return _this;
  }

  /**
   * Parse the input string and update the manifest object.
   *
   * @param {String} chunk a potentially incomplete portion of the manifest
   */


  _createClass(Parser, [{
    key: 'push',
    value: function push(chunk) {
      this.lineStream.push(chunk);
    }

    /**
     * Flush any remaining input. This can be handy if the last line of an M3U8
     * manifest did not contain a trailing newline but the file has been
     * completely received.
     */

  }, {
    key: 'end',
    value: function end() {
      // flush any buffered input
      this.lineStream.push('\n');
    }
  }]);

  return Parser;
}(_stream2['default']);

exports['default'] = Parser;

},{"./line-stream":2,"./parse-stream":3,"./stream":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file stream.js
 */
/**
 * A lightweight readable stream implemention that handles event dispatching.
 *
 * @class Stream
 */
var Stream = function () {
  function Stream() {
    _classCallCheck(this, Stream);

    this.listeners = {};
  }

  /**
   * Add a listener for a specified event type.
   *
   * @param {String} type the event name
   * @param {Function} listener the callback to be invoked when an event of
   * the specified type occurs
   */


  _createClass(Stream, [{
    key: 'on',
    value: function on(type, listener) {
      if (!this.listeners[type]) {
        this.listeners[type] = [];
      }
      this.listeners[type].push(listener);
    }

    /**
     * Remove a listener for a specified event type.
     *
     * @param {String} type the event name
     * @param {Function} listener  a function previously registered for this
     * type of event through `on`
     * @return {Boolean} if we could turn it off or not
     */

  }, {
    key: 'off',
    value: function off(type, listener) {
      if (!this.listeners[type]) {
        return false;
      }

      var index = this.listeners[type].indexOf(listener);

      this.listeners[type].splice(index, 1);
      return index > -1;
    }

    /**
     * Trigger an event of the specified type on this stream. Any additional
     * arguments to this function are passed as parameters to event listeners.
     *
     * @param {String} type the event name
     */

  }, {
    key: 'trigger',
    value: function trigger(type) {
      var callbacks = this.listeners[type];
      var i = void 0;
      var length = void 0;
      var args = void 0;

      if (!callbacks) {
        return;
      }
      // Slicing the arguments on every invocation of this method
      // can add a significant amount of overhead. Avoid the
      // intermediate object creation for the common case of a
      // single callback argument
      if (arguments.length === 2) {
        length = callbacks.length;
        for (i = 0; i < length; ++i) {
          callbacks[i].call(this, arguments[1]);
        }
      } else {
        args = Array.prototype.slice.call(arguments, 1);
        length = callbacks.length;
        for (i = 0; i < length; ++i) {
          callbacks[i].apply(this, args);
        }
      }
    }

    /**
     * Destroys the stream and cleans up.
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      this.listeners = {};
    }
    /**
     * Forwards all `data` events on this stream to the destination stream. The
     * destination stream should provide a method `push` to receive the data
     * events as they arrive.
     *
     * @param {Stream} destination the stream that will receive all `data` events
     * @see http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
     */

  }, {
    key: 'pipe',
    value: function pipe(destination) {
      this.on('data', function (data) {
        destination.push(data);
      });
    }
  }]);

  return Stream;
}();

exports['default'] = Stream;

},{}],6:[function(require,module,exports){
(function (global){
'use strict';

var _src = require('../src');

var _qunit = (typeof window !== "undefined" ? window['QUnit'] : typeof global !== "undefined" ? global['QUnit'] : null);

var _qunit2 = _interopRequireDefault(_qunit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_qunit2['default'].module('LineStream', {
  beforeEach: function beforeEach() {
    this.lineStream = new _src.LineStream();
  }
});
/*
QUnit.test('empty inputs produce no tokens', function() {
  let data = false;

  this.lineStream.on('data', function() {
    data = true;
  });
  this.lineStream.push('');
  QUnit.ok(!data, 'no tokens were produced');
});
QUnit.test('splits on newlines', function() {
  const lines = [];

  this.lineStream.on('data', function(line) {
    lines.push(line);
  });
  this.lineStream.push('#EXTM3U\nmovie.ts\n');

  QUnit.strictEqual(2, lines.length, 'two lines are ready');
  QUnit.strictEqual('#EXTM3U', lines.shift(), 'the first line is the first token');
  QUnit.strictEqual('movie.ts', lines.shift(), 'the second line is the second token');
});
QUnit.test('empty lines become empty strings', function() {
  const lines = [];

  this.lineStream.on('data', function(line) {
    lines.push(line);
  });
  this.lineStream.push('\n\n');

  QUnit.strictEqual(2, lines.length, 'two lines are ready');
  QUnit.strictEqual('', lines.shift(), 'the first line is empty');
  QUnit.strictEqual('', lines.shift(), 'the second line is empty');
});
QUnit.test('handles lines broken across appends', function() {
  const lines = [];

  this.lineStream.on('data', function(line) {
    lines.push(line);
  });
  this.lineStream.push('#EXTM');
  QUnit.strictEqual(0, lines.length, 'no lines are ready');

  this.lineStream.push('3U\nmovie.ts\n');
  QUnit.strictEqual(2, lines.length, 'two lines are ready');
  QUnit.strictEqual('#EXTM3U', lines.shift(), 'the first line is the first token');
  QUnit.strictEqual('movie.ts', lines.shift(), 'the second line is the second token');
});
QUnit.test('stops sending events after deregistering', function() {
  const temporaryLines = [];
  const temporary = function(line) {
    temporaryLines.push(line);
  };
  const permanentLines = [];
  const permanent = function(line) {
    permanentLines.push(line);
  };

  this.lineStream.on('data', temporary);
  this.lineStream.on('data', permanent);
  this.lineStream.push('line one\n');
  QUnit.strictEqual(temporaryLines.length,
                    permanentLines.length,
                    'both callbacks receive the event');

  QUnit.ok(this.lineStream.off('data', temporary), 'a listener was removed');
  this.lineStream.push('line two\n');
  QUnit.strictEqual(1, temporaryLines.length, 'no new events are received');
  QUnit.strictEqual(2, permanentLines.length, 'new events are still received');
});

QUnit.module('ParseStream', {
  beforeEach() {
    this.lineStream = new LineStream();
    this.parseStream = new ParseStream();
    this.lineStream.pipe(this.parseStream);
  }
});
QUnit.test('parses comment lines', function() {
  const manifest = '# a line that starts with a hash mark without "EXT" is a comment\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'comment', 'the type is comment');
  QUnit.strictEqual(element.text,
                    manifest.slice(1, manifest.length - 1),
                    'the comment text is parsed');
});
QUnit.test('parses uri lines', function() {
  const manifest = 'any non-blank line that does not start with a hash-mark is a URI\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'uri', 'the type is uri');
  QUnit.strictEqual(element.uri,
                    manifest.substring(0, manifest.length - 1),
                    'the uri text is parsed');
});
QUnit.test('parses unknown tag types', function() {
  const manifest = '#EXT-X-EXAMPLE-TAG:some,additional,stuff\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the type is tag');
  QUnit.strictEqual(element.data,
                    manifest.slice(4, manifest.length - 1),
                    'unknown tag data is preserved');
});

// #EXTM3U
QUnit.test('parses #EXTM3U tags', function() {
  const manifest = '#EXTM3U\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'm3u', 'the tag type is m3u');
});

// #EXTINF
QUnit.test('parses minimal #EXTINF tags', function() {
  const manifest = '#EXTINF\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'inf', 'the tag type is inf');
});
QUnit.test('parses #EXTINF tags with durations', function() {
  let manifest = '#EXTINF:15\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'inf', 'the tag type is inf');
  QUnit.strictEqual(element.duration, 15, 'the duration is parsed');
  QUnit.ok(!('title' in element), 'no title is parsed');

  manifest = '#EXTINF:21,\n';
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'inf', 'the tag type is inf');
  QUnit.strictEqual(element.duration, 21, 'the duration is parsed');
  QUnit.ok(!('title' in element), 'no title is parsed');
});
QUnit.test('parses #EXTINF tags with a duration and title', function() {
  const manifest = '#EXTINF:13,Does anyone really use the title attribute?\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'inf', 'the tag type is inf');
  QUnit.strictEqual(element.duration, 13, 'the duration is parsed');
  QUnit.strictEqual(element.title,
                    manifest.substring(manifest.indexOf(',') + 1, manifest.length - 1),
                    'the title is parsed');
});
QUnit.test('parses #EXTINF tags with carriage returns', function() {
  const manifest = '#EXTINF:13,Does anyone really use the title attribute?\r\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'inf', 'the tag type is inf');
  QUnit.strictEqual(element.duration, 13, 'the duration is parsed');
  QUnit.strictEqual(element.title,
                    manifest.substring(manifest.indexOf(',') + 1, manifest.length - 2),
                    'the title is parsed');
});

// #EXT-X-TARGETDURATION
QUnit.test('parses minimal #EXT-X-TARGETDURATION tags', function() {
  const manifest = '#EXT-X-TARGETDURATION\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'targetduration', 'the tag type is targetduration');
  QUnit.ok(!('duration' in element), 'no duration is parsed');
});
QUnit.test('parses #EXT-X-TARGETDURATION with duration', function() {
  const manifest = '#EXT-X-TARGETDURATION:47\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'targetduration', 'the tag type is targetduration');
  QUnit.strictEqual(element.duration, 47, 'the duration is parsed');
});

// #EXT-X-VERSION
QUnit.test('parses minimal #EXT-X-VERSION tags', function() {
  const manifest = '#EXT-X-VERSION:\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'version', 'the tag type is version');
  QUnit.ok(!('version' in element), 'no version is present');
});
QUnit.test('parses #EXT-X-VERSION with a version', function() {
  const manifest = '#EXT-X-VERSION:99\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'version', 'the tag type is version');
  QUnit.strictEqual(element.version, 99, 'the version is parsed');
});

// #EXT-X-MEDIA-SEQUENCE
QUnit.test('parses minimal #EXT-X-MEDIA-SEQUENCE tags', function() {
  const manifest = '#EXT-X-MEDIA-SEQUENCE\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'media-sequence', 'the tag type is media-sequence');
  QUnit.ok(!('number' in element), 'no number is present');
});
QUnit.test('parses #EXT-X-MEDIA-SEQUENCE with sequence numbers', function() {
  const manifest = '#EXT-X-MEDIA-SEQUENCE:109\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'media-sequence', 'the tag type is media-sequence');
  QUnit.ok(element.number, 109, 'the number is parsed');
});

// #EXT-X-PLAYLIST-TYPE
QUnit.test('parses minimal #EXT-X-PLAYLIST-TYPE tags', function() {
  const manifest = '#EXT-X-PLAYLIST-TYPE:\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'playlist-type', 'the tag type is playlist-type');
  QUnit.ok(!('playlistType' in element), 'no playlist type is present');
});
QUnit.test('parses #EXT-X-PLAYLIST-TYPE with mutability info', function() {
  let manifest = '#EXT-X-PLAYLIST-TYPE:EVENT\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'playlist-type', 'the tag type is playlist-type');
  QUnit.strictEqual(element.playlistType, 'EVENT', 'the playlist type is EVENT');

  manifest = '#EXT-X-PLAYLIST-TYPE:VOD\n';
  this.lineStream.push(manifest);
  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'playlist-type', 'the tag type is playlist-type');
  QUnit.strictEqual(element.playlistType, 'VOD', 'the playlist type is VOD');

  manifest = '#EXT-X-PLAYLIST-TYPE:nonsense\n';
  this.lineStream.push(manifest);
  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'playlist-type', 'the tag type is playlist-type');
  QUnit.strictEqual(element.playlistType, 'nonsense', 'the playlist type is parsed');
});

// #EXT-X-BYTERANGE
QUnit.test('parses minimal #EXT-X-BYTERANGE tags', function() {
  const manifest = '#EXT-X-BYTERANGE\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'byterange', 'the tag type is byterange');
  QUnit.ok(!('length' in element), 'no length is present');
  QUnit.ok(!('offset' in element), 'no offset is present');
});
QUnit.test('parses #EXT-X-BYTERANGE with length and offset', function() {
  let manifest = '#EXT-X-BYTERANGE:45\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'byterange', 'the tag type is byterange');
  QUnit.strictEqual(element.length, 45, 'length is parsed');
  QUnit.ok(!('offset' in element), 'no offset is present');

  manifest = '#EXT-X-BYTERANGE:108@16\n';
  this.lineStream.push(manifest);
  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'byterange', 'the tag type is byterange');
  QUnit.strictEqual(element.length, 108, 'length is parsed');
  QUnit.strictEqual(element.offset, 16, 'offset is parsed');
});

// #EXT-X-ALLOW-CACHE
QUnit.test('parses minimal #EXT-X-ALLOW-CACHE tags', function() {
  const manifest = '#EXT-X-ALLOW-CACHE:\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'allow-cache', 'the tag type is allow-cache');
  QUnit.ok(!('allowed' in element), 'no allowed is present');
});
QUnit.test('parses valid #EXT-X-ALLOW-CACHE tags', function() {
  let manifest = '#EXT-X-ALLOW-CACHE:YES\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'allow-cache', 'the tag type is allow-cache');
  QUnit.ok(element.allowed, 'allowed is parsed');

  manifest = '#EXT-X-ALLOW-CACHE:NO\n';
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'allow-cache', 'the tag type is allow-cache');
  QUnit.ok(!element.allowed, 'allowed is parsed');
});
// #EXT-X-MAP
QUnit.test('parses minimal #EXT-X-MAP tags', function() {
  const manifest = '#EXT-X-MAP:URI="init.m4s"\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });

  this.lineStream.push(manifest);
  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'map', 'the tag type is map');
  QUnit.strictEqual(element.uri, 'init.m4s', 'parsed the uri');
});
QUnit.test('parses #EXT-X-MAP tags with a byterange', function() {
  const manifest = '#EXT-X-MAP:URI="0.m4s", BYTERANGE="1000@23"\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });

  this.lineStream.push(manifest);
  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.uri, '0.m4s', 'parsed the uri');
  QUnit.strictEqual(element.byterange.length,
                    1000,
                    'parsed the byterange length');
  QUnit.strictEqual(element.byterange.offset,
                    23,
                    'parsed the byterange offset');
});
QUnit.test('parses #EXT-X-MAP tags with arbitrary attributes', function() {
  const manifest = '#EXT-X-MAP:URI="init.mp4", SOMETHING=YES,BYTERANGE="720@0"\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });

  this.lineStream.push(manifest);
  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.uri, 'init.mp4', 'parsed the uri');
  QUnit.strictEqual(element.byterange.length,
                    720,
                    'parsed the byterange length');
  QUnit.strictEqual(element.byterange.offset,
                    0,
                    'parsed the byterange offset');
});
// #EXT-X-STREAM-INF
QUnit.test('parses minimal #EXT-X-STREAM-INF tags', function() {
  const manifest = '#EXT-X-STREAM-INF\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'stream-inf', 'the tag type is stream-inf');
  QUnit.ok(!('attributes' in element), 'no attributes are present');
});
// #EXT-X-PROGRAM-DATE-TIME
QUnit.test('parses minimal EXT-X-PROGRAM-DATE-TIME tags', function() {
  const manifest = '#EXT-X-PROGRAM-DATE-TIME\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'program-date-time', 'the tag type is date-time');
  QUnit.ok(!('dateTimeString' in element), 'no dateTime is present');
});
QUnit.test('parses EXT-X-PROGRAM-DATE-TIME tags with valid date-time formats',
  function() {
    let manifest = '#EXT-X-PROGRAM-DATE-TIME:2016-06-22T09:20:16.166-04:00\n';
    let element;

    this.parseStream.on('data', function(elem) {
      element = elem;
    });
    this.lineStream.push(manifest);

    QUnit.ok(element, 'an event was triggered');
    QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
    QUnit.strictEqual(element.tagType, 'program-date-time', 'the tag type is date-time');
    QUnit.strictEqual(element.dateTimeString, '2016-06-22T09:20:16.166-04:00',
      'dateTimeString is parsed');
    QUnit.deepEqual(element.dateTimeObject, new Date('2016-06-22T09:20:16.166-04:00'),
      'dateTimeObject is parsed');

    manifest = '#EXT-X-PROGRAM-DATE-TIME:2016-06-22T09:20:16.16389Z\n';
    this.lineStream.push(manifest);

    QUnit.ok(element, 'an event was triggered');
    QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
    QUnit.strictEqual(element.tagType, 'program-date-time', 'the tag type is date-time');
    QUnit.strictEqual(element.dateTimeString, '2016-06-22T09:20:16.16389Z',
      'dateTimeString is parsed');
    QUnit.deepEqual(element.dateTimeObject, new Date('2016-06-22T09:20:16.16389Z'),
      'dateTimeObject is parsed');
  });
QUnit.test('parses #EXT-X-STREAM-INF with common attributes', function() {
  let manifest = '#EXT-X-STREAM-INF:BANDWIDTH=14400\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'stream-inf', 'the tag type is stream-inf');
  QUnit.strictEqual(element.attributes.BANDWIDTH, 14400, 'bandwidth is parsed');

  manifest = '#EXT-X-STREAM-INF:PROGRAM-ID=7\n';
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'stream-inf', 'the tag type is stream-inf');
  QUnit.strictEqual(element.attributes['PROGRAM-ID'], 7, 'program-id is parsed');

  manifest = '#EXT-X-STREAM-INF:RESOLUTION=396x224\n';
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'stream-inf', 'the tag type is stream-inf');
  QUnit.strictEqual(element.attributes.RESOLUTION.width, 396, 'width is parsed');
  QUnit.strictEqual(element.attributes.RESOLUTION.height, 224, 'heigth is parsed');

  manifest = '#EXT-X-STREAM-INF:CODECS="avc1.4d400d, mp4a.40.2"\n';
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'stream-inf', 'the tag type is stream-inf');
  QUnit.strictEqual(element.attributes.CODECS,
                    'avc1.4d400d, mp4a.40.2',
                    'codecs are parsed');
});
QUnit.test('parses #EXT-X-STREAM-INF with arbitrary attributes', function() {
  const manifest = '#EXT-X-STREAM-INF:NUMERIC=24,ALPHA=Value,MIXED=123abc\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'stream-inf', 'the tag type is stream-inf');
  QUnit.strictEqual(element.attributes.NUMERIC, '24', 'numeric attributes are parsed');
  QUnit.strictEqual(element.attributes.ALPHA,
                    'Value',
                    'alphabetic attributes are parsed');
  QUnit.strictEqual(element.attributes.MIXED, '123abc', 'mixed attributes are parsed');
});
// #EXT-X-ENDLIST
QUnit.test('parses #EXT-X-ENDLIST tags', function() {
  const manifest = '#EXT-X-ENDLIST\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.strictEqual(element.type, 'tag', 'the line type is tag');
  QUnit.strictEqual(element.tagType, 'endlist', 'the tag type is stream-inf');
});

// #EXT-X-KEY
QUnit.test('parses valid #EXT-X-KEY tags', function() {
  let manifest =
    '#EXT-X-KEY:METHOD=AES-128,URI="https://priv.example.com/key.php?r=52"\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.deepEqual(element, {
    type: 'tag',
    tagType: 'key',
    attributes: {
      METHOD: 'AES-128',
      URI: 'https://priv.example.com/key.php?r=52'
    }
  }, 'parsed a valid key');

  manifest = '#EXT-X-KEY:URI="https://example.com/key#1",METHOD=FutureType-1024\n';
  this.lineStream.push(manifest);
  QUnit.ok(element, 'an event was triggered');
  QUnit.deepEqual(element, {
    type: 'tag',
    tagType: 'key',
    attributes: {
      METHOD: 'FutureType-1024',
      URI: 'https://example.com/key#1'
    }
  }, 'parsed the attribute list independent of order');

  manifest = '#EXT-X-KEY:IV=1234567890abcdef1234567890abcdef\n';
  this.lineStream.push(manifest);
  QUnit.ok(element.attributes.IV, 'detected an IV attribute');
  QUnit.deepEqual(element.attributes.IV, new Uint32Array([
    0x12345678,
    0x90abcdef,
    0x12345678,
    0x90abcdef
  ]), 'parsed an IV value');
});

QUnit.test('parses minimal #EXT-X-KEY tags', function() {
  const manifest = '#EXT-X-KEY:\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.ok(element, 'an event was triggered');
  QUnit.deepEqual(element, {
    type: 'tag',
    tagType: 'key'
  }, 'parsed a minimal key tag');
});

QUnit.test('parses lightly-broken #EXT-X-KEY tags', function() {
  let manifest = '#EXT-X-KEY:URI=\'https://example.com/single-quote\',METHOD=AES-128\n';
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });
  this.lineStream.push(manifest);

  QUnit.strictEqual(element.attributes.URI,
                    'https://example.com/single-quote',
                    'parsed a single-quoted uri');

  element = null;
  manifest = '#EXT-X-KEYURI="https://example.com/key",METHOD=AES-128\n';
  this.lineStream.push(manifest);
  QUnit.strictEqual(element.tagType, 'key', 'parsed the tag type');
  QUnit.strictEqual(element.attributes.URI,
                    'https://example.com/key',
                    'inferred a colon after the tag type');

  element = null;
  manifest = '#EXT-X-KEY:  URI =  "https://example.com/key",METHOD=AES-128\n';
  this.lineStream.push(manifest);
  QUnit.strictEqual(element.attributes.URI,
                    'https://example.com/key',
                    'trims and removes quotes around the URI');
});

QUnit.test('parses prefixed with 0x or 0X #EXT-X-KEY:IV tags', function() {
  let manifest;
  let element;

  this.parseStream.on('data', function(elem) {
    element = elem;
  });

  manifest = '#EXT-X-KEY:IV=0x1234567890abcdef1234567890abcdef\n';
  this.lineStream.push(manifest);
  QUnit.ok(element.attributes.IV, 'detected an IV attribute');
  QUnit.deepEqual(element.attributes.IV, new Uint32Array([
    0x12345678,
    0x90abcdef,
    0x12345678,
    0x90abcdef
  ]), 'parsed an IV value with 0x');

  manifest = '#EXT-X-KEY:IV=0X1234567890abcdef1234567890abcdef\n';
  this.lineStream.push(manifest);
  QUnit.ok(element.attributes.IV, 'detected an IV attribute');
  QUnit.deepEqual(element.attributes.IV, new Uint32Array([
    0x12345678,
    0x90abcdef,
    0x12345678,
    0x90abcdef
  ]), 'parsed an IV value with 0X');
});

QUnit.test('ignores empty lines', function() {
  const manifest = '\n';
  let event = false;

  this.parseStream.on('data', function() {
    event = true;
  });
  this.lineStream.push(manifest);

  QUnit.ok(!event, 'no event is triggered');
});

QUnit.module('m3u8 parser');

QUnit.test('can be constructed', function() {
  QUnit.notStrictEqual(typeof new Parser(), 'undefined', 'parser is defined');
});

QUnit.test('attaches cue-out data to segment', function() {
  const parser = new Parser();

  const manifest = [
    '#EXTM3U',
    '#EXTINF:5,',
    '#COMMENT',
    'ex1.ts',
    '#EXT-X-CUE-OUT:10',
    '#EXTINF:5,',
    'ex2.ts',
    '#EXT-X-CUE-OUT15',
    '#EXT-UKNOWN-TAG',
    '#EXTINF:5,',
    'ex3.ts',
    '#EXT-X-CUE-OUT',
    '#EXTINF:5,',
    'ex3.ts',
    '#EXT-X-ENDLIST'
  ].join('\n');

  parser.push(manifest);

  QUnit.equal(parser.manifest.segments[1].cueOut, '10', 'parser attached cue out tag');
  QUnit.equal(parser.manifest.segments[2].cueOut, '15', 'cue out without : seperator');
  QUnit.equal(parser.manifest.segments[3].cueOut, '', 'cue out without data');
});

QUnit.test('attaches cue-out-cont data to segment', function() {
  const parser = new Parser();

  const manifest = [
    '#EXTM3U',
    '#EXTINF:5,',
    '#COMMENT',
    'ex1.ts',
    '#EXT-X-CUE-OUT-CONT:10/60',
    '#EXTINF:5,',
    'ex2.ts',
    '#EXT-X-CUE-OUT-CONT15/30',
    '#EXT-UKNOWN-TAG',
    '#EXTINF:5,',
    'ex3.ts',
    '#EXT-X-CUE-OUT-CONT',
    '#EXTINF:5,',
    'ex3.ts',
    '#EXT-X-ENDLIST'
  ].join('\n');

  parser.push(manifest);

  QUnit.equal(parser.manifest.segments[1].cueOutCont, '10/60',
    'parser attached cue out cont tag');
  QUnit.equal(parser.manifest.segments[2].cueOutCont, '15/30',
    'cue out cont without : seperator');
  QUnit.equal(parser.manifest.segments[3].cueOutCont, '', 'cue out cont without data');
});
*/

_qunit2['default'].test('attaches cue-in data and program time to segment', function () {
  var parser = new _src.Parser();

  var manifest = ['#EXTM3U', '#EXTINF:5,', '#COMMENT', 'ex1.ts', '#EXT-X-CUE-IN', '#EXT-X-PROGRAM-DATE-TIME:2016-06-22T09:20:16.166-04:00', '#EXTINF:5,', 'ex2.ts', '#EXT-X-CUE-IN:15', '#EXT-UKNOWN-TAG', '#EXTINF:5,', 'ex3.ts', '#EXT-X-CUE-IN=abc', '#EXTINF:5,', 'ex3.ts', '#EXT-X-ENDLIST'].join('\n');

  parser.push(manifest);

  _qunit2['default'].equal(parser.manifest.segments[1].startTime, new Date('2016-06-22T09:20:16.166-04:00'), 'parser attached' + ' startTime in' + ' tag');
  _qunit2['default'].equal(parser.manifest.segments[1].cueIn, '', 'parser attached cue in tag');
  _qunit2['default'].equal(parser.manifest.segments[2].cueIn, '15', 'cue in with data');
  _qunit2['default'].equal(parser.manifest.segments[3].cueIn, '=abc', 'cue in without colon seperator');
});
/*
QUnit.test('parses characteristics attribute', function() {
  const parser = new Parser();

  const manifest = [
    '#EXTM3U',
    '#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",CHARACTERISTICS="char",NAME="test"',
    '#EXT-X-STREAM-INF:BANDWIDTH=1,CODECS="mp4a.40.2, avc1.4d400d",SUBTITLES="subs"',
    'index.m3u8'
  ].join('\n');

  parser.push(manifest);

  QUnit.equal(parser.manifest.mediaGroups.SUBTITLES.subs.test.characteristics,
              'char',
              'parsed CHARACTERISTICS attribute');
});

QUnit.test('parses FORCED attribute', function() {
  const parser = new Parser();

  const manifest = [
    '#EXTM3U',
    '#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",CHARACTERISTICS="char",NAME="test",FORCED=YES',
    '#EXT-X-STREAM-INF:BANDWIDTH=1,CODECS="mp4a.40.2, avc1.4d400d",SUBTITLES="subs"',
    'index.m3u8'
  ].join('\n');

  parser.push(manifest);

  QUnit.ok(parser.manifest.mediaGroups.SUBTITLES.subs.test.forced,
           'parsed FORCED attribute');
});*/

_qunit2['default'].module('m3u8s');

/*
QUnit.test('parses static manifests as expected', function() {
  let key;

  for (key in testDataManifests) {
    if (testDataExpected[key]) {
      const parser = new Parser();

      parser.push(testDataManifests[key]);
      QUnit.deepEqual(parser.manifest,
                      testDataExpected[key],
                      key + '.m3u8 was parsed correctly'
      );
    }
  }
});
*/

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../src":1}]},{},[6]);

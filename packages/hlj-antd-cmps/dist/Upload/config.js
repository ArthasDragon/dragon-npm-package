var _this = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

export default (function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var Qiniu = new QiniuJsSDK();

  var filesAdded = config.filesAdded,
      beforeUpload = config.beforeUpload,
      uploadProgress = config.uploadProgress,
      uploadComplete = config.uploadComplete,
      fileUploaded = config.fileUploaded,
      filesRemoved = config.filesRemoved,
      onError = config.onError,
      rest = _objectWithoutProperties(config, ['filesAdded', 'beforeUpload', 'uploadProgress', 'uploadComplete', 'fileUploaded', 'filesRemoved', 'onError']);

  return Qiniu.uploader(_extends({
    runtimes: 'html5,flash,html4',
    browse_button: '',
    container: '',
    drop_element: '',
    max_file_size: '100mb',
    flash_swf_url: 'js/plupload/Moxie.swf',
    max_retries: 3,
    dragdrop: false,
    unique_names: true,
    multi_selection: false, //false 为单选

    filters: {
      mime_types: [{ title: 'Image files', extensions: 'jpg,gif,png,jpeg,bmp' }, { title: 'Video files', extensions: 'mp4' }]
    },

    chunk_size: '4mb',
    get_new_uptoken: false,
    // uptoken:'',
    uptoken_url: '/p/wedding/home/APIUtils/image_upload_token',
    domain: 'https://qnm.hunliji.com/',
    auto_start: true,
    init: {
      FilesAdded: function FilesAdded(up, file) {
        filesAdded && filesAdded(up, file);
      },
      BeforeUpload: function BeforeUpload(up, file) {
        beforeUpload && beforeUpload(up, file);
      },
      UploadProgress: function UploadProgress(up, file) {
        uploadProgress && uploadProgress(file, file.percent * 1, up);
      },
      UploadComplete: function UploadComplete() {
        uploadComplete && uploadComplete();
      },
      FileUploaded: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(up, file, info) {
          var res, sourceLink;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  res = JSON.parse(info);
                  sourceLink = res.domain + (res.image_path ? res.image_path : res.video_path);

                  fileUploaded && fileUploaded(file, sourceLink, res, up);

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function FileUploaded(_x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }(),
      FilesRemoved: function FilesRemoved() {
        filesRemoved && filesRemoved();
      },
      Error: function Error(up, err, errTip) {
        onError && onError(up, err, errTip);
      }
    }
  }, rest));
});
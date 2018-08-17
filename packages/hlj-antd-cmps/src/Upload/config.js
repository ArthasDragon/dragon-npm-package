export default (config = {}) => {
  const Qiniu = new QiniuJsSDK()
  const {
    filesAdded,
    beforeUpload,
    uploadProgress,
    uploadComplete,
    fileUploaded,
    filesRemoved,
    onError,
    ...rest
  } = config
  return Qiniu.uploader({
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
      mime_types: [
        { title: 'Image files', extensions: 'jpg,gif,png,jpeg,bmp' },
        { title: 'Video files', extensions: 'mp4' }
      ]
    },

    chunk_size: '4mb',
    get_new_uptoken: false,
    // uptoken:'',
    uptoken_url: '/p/wedding/home/APIUtils/image_upload_token',
    domain: 'https://qnm.hunliji.com/',
    auto_start: true,
    init: {
      FilesAdded: (up, file) => {
        filesAdded && filesAdded(up, file)
      },
      BeforeUpload: (up, file) => {
        beforeUpload && beforeUpload(up, file)
      },
      UploadProgress: function(up, file) {
        uploadProgress && uploadProgress(file, file.percent * 1, up)
      },
      UploadComplete: function() {
        uploadComplete && uploadComplete()
      },
      FileUploaded: async (up, file, info) => {
        let res = JSON.parse(info)
        let sourceLink = res.domain + (res.image_path ? res.image_path : res.video_path)
        fileUploaded && fileUploaded(file, sourceLink, res, up)
      },
      FilesRemoved: () => {
        filesRemoved && filesRemoved()
      },
      Error: (up, err, errTip) => {
        onError && onError(up, err, errTip)
      }
    },
    ...rest
  })
}

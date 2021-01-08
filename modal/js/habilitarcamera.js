  $(document).ready(function() {
      $("#webcam").webcam({
          swffile: "js/sAS3Cam.swf?v=" + Math.random(),
          previewWidth: 220,
          previewHeight: 150,
          resolutionWidth: 220,
          resolutionHeight: 150,
          StageScaleMode: 'noScale',
          StageAlign: 'TL',
          noCameraFound: function() {
              this.debug('error', 'Web camera is not available');
          },

          swfApiFail: function(e) {
              this.debug('error', 'Internal camera plugin error');
          },

          cameraDisabled: function() {
              this.debug('error', 'Please allow access to your camera');
          },

          debug: function(type, string) {
              if (type == 'error') {
                  $(".webcam-error").html(string);
              } else {
                  $(".webcam-error").html('');
              }
          },

          cameraEnabled: function() {
              this.debug('notice', 'Camera enabled');
              var cameraApi = this;
              if (cameraApi.isCameraEnabled) {
                  return;
              } else {
                  cameraApi.isCameraEnabled = true;
              }
              var cams = cameraApi.getCameraList();

              for (var i in cams) {
                  $("#popup-webcam-cams").append("<option value='" + i + "'>" + cams[i] + "</option>");
              }

              setTimeout(function() {
                  $("#popup-webcam-take-photo").removeAttr('disabled');
                  $("#popup-webcam-take-photo").show();
                  cameraApi.setCamera('0');
              }, 750);

              $("#popup-webcam-cams").change(function() {
                  var success = cameraApi.setCamera($(this).val());
                  if (!success) {
                      cameraApi.debug('error', 'Unable to select camera');
                  } else {
                      cameraApi.debug('notice', 'Camera changed');
                  }
              });

              $('#popup-webcam-take-photo').click(function() {
                  var result = cameraApi.save();
                  //alert("1=" + result)
                  if (result && result.length) {
                      var actualShotResolution = cameraApi.getResolution();
                      //alert(actualShotResolution)

                      var img = new Image();
                      img.src = 'data:image/jpeg;base64,' + result;
                      //  alert(img.src)

                      //     $("#result").append(img);
                      $("#result").html("<img src='data:image/jpeg;base64" + img.src + "'width='150' height='150'/>");
                      $("#resultdrive").val(img.src);


                      //console.log(result);

                      //  alert('base64encoded jpeg (' + actualShotResolution[0] + 'x' + actualShotResolution[1] + '): ' + result.length + 'chars');

                      /* resume camera capture */
                      cameraApi.setCamera($("#popup-webcam-cams").val());
                  } else {
                      cameraApi.debug('error', 'Broken camera');
                  }
              });
              var reload = function() {
                  $('#popup-webcam-take-photo').show();
              };
              $('#popup-webcam-save').click(function() {
                  reload();
              });
          }
      });
  });
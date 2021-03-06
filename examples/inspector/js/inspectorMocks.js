/*
 * Copyright 2013 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function configureMocks(remoteFile) {
  if (remoteFile.indexOf('jwplayer') >= 0) {
    // Simulate ExternalInterfaceService
    Shumway.ExternalInterfaceService.instance = {
      enabled: true,
      initJS: function (callback) {
        this._callIn = callback;
      },
      registerCallback: function (functionName) {
        // do nothing atm
      },
      unregisterCallback: function (functionName) {
        // do nothing atm
      },
      eval: function (expr) {
        if (expr.indexOf('jwplayer.utils.tea.decrypt') >= 0) {
          return "<string></string>";
        } else if (expr.indexOf('jwplayer.embed.flash.getVars') >= 0) {
          var base = document.location.href;
          base = base.substring(0, base.lastIndexOf('inspector.html'));
          return '<object><property id="aspectratio"><string>56.25%</string></property><property id="playlist"><array><property id="0"><object><property id="sources"><array><property id="0"><object><property id="file"><string>../videoplayer/big_buck_bunny.mp4</string></property><property id="default"><false/></property></object></property></array></property><property id="tracks"><array></array></property><property id="image"><string>../examples/image-loading/firefox.png</string></property><property id="title"><string>test</string></property></object></property></array></property><property id="id"><string>' + objId + '</string></property><property id="base"><string>' + base + '</string></property></object>';
        } else if (expr.indexOf('jwplayer.playerReady') >= 0) {
          // TODO client calls back jwAddEventListener, jwGetWidth/jwGetHeight
          return "<undefined/>";
        } else {
          throw new Error('Unexpected ExternalInterfaceService::eval()');
        }
      },
      call: function (request) {
        throw new Error('Unexpected ExternalInterfaceService::call()');
      },
      getId: function () {
        return 'jwplayerObjectId';
      }
    };
  } else if (remoteFile.indexOf('fbplayer') >= 0) {
    if (typeof movieParams !== 'undefined') {
      movieParams = parseQueryString('params=%7B%22autoplay%22%3Afalse%2C%22auto_hd%22%3Afalse%2C%22autoplay_reason%22%3A%22unknown%22%2C%22autoplay_setting%22%3Anull%2C%22autorewind%22%3Atrue%2C%22click_to_snowlift%22%3Afalse%2C%22default_hd%22%3Afalse%2C%22dtsg%22%3A%22AQHfX68W57TB%22%2C%22inline_player%22%3Afalse%2C%22lsd%22%3A%22AVqO5O2q%22%2C%22min_progress_update%22%3A300%2C%22pixel_ratio%22%3A2%2C%22player_origin%22%3A%22unknown%22%2C%22preload%22%3Atrue%2C%22source%22%3A%22pages_finch_thumbnail_video%22%2C%22start_index%22%3A0%2C%22start_muted%22%3Afalse%2C%22stream_type%22%3A%22stream%22%2C%22use_spotlight%22%3Afalse%2C%22video_data%22%3A%5B%7B%22hd_src%22%3Anull%2C%22is_hds%22%3Afalse%2C%22is_hls%22%3Afalse%2C%22index%22%3A0%2C%22rotation%22%3A0%2C%22sd_src%22%3A%22https%3A%5C%2F%5C%2Ffbcdn-video-j-a.akamaihd.net%5C%2Fhvideo-ak-xpa1%5C%2Fv%5C%2Ft42.1790-2%5C%2F1496999_252838788222485_1373652694_n.mp4%3Frl%3D8000%26vabr%3D278%26oh%3Dadab3c69bc8de0f904a90bef9ea90138%26oe%3D5459450A%26__gda__%3D1415140725_5a5ccacf8aa44f942f5253257c80b419%22%2C%22thumbnail_src%22%3A%22https%3A%5C%2F%5C%2Ffbcdn-vthumb-a.akamaihd.net%5C%2Fhvthumb-ak-xpf1%5C%2Fv%5C%2Ft15.0-10%5C%2F1898683_252838798222484_252838751555822_46466_646_b.jpg%3Foh%3D5dbd5ecbd10f3fb4ea1f06092663b1f5%26oe%3D54F607DE%26__gda__%3D1423639605_cbec4182128f4ecdfb6e0ef45150bdde%22%2C%22thumbnail_height%22%3A224%2C%22thumbnail_width%22%3A400%2C%22video_duration%22%3A34%2C%22video_id%22%3A%22252838751555822%22%2C%22subtitles_src%22%3Anull%7D%5D%2C%22show_captions_default%22%3Afalse%2C%22persistent_volume%22%3Atrue%2C%22buffer_length%22%3A0.1%7D&width=520&height=291&user=0&log=no&div_id=id_545929699ed393786859473&swf_id=swf_id_545929699ed393786859473&browser=Chrome+38.0.2125.111&tracking_domain=https%3A%2F%2Fpixel.facebook.com&post_form_id=&string_table=https%3A%2F%2Fs-static.ak.facebook.com%2Fflash_strings.php%2Ft98272%2Fen_US');
    }

    // Simulate ExternalInterfaceService
    Shumway.ExternalInterfaceService.instance = {
      enabled: true,
      initJS: function (callback) {
        this._callIn = callback;
      },
      registerCallback: function (functionName) {
        // do nothing atm
      },
      unregisterCallback: function (functionName) {
        // do nothing atm
      },
      eval: function (expr) {
        console.info(expr);
        if (expr.indexOf('location.hostname.toString()') >= 0) {
          return "<string>www.facebook.com</string>";
        } else if (expr.indexOf('Arbiter.inform("flash/ready') >= 0) {
          return "<undefined/>";
        } else if (expr.indexOf('Arbiter.inform("flash/buffering') >= 0) {
          return "<undefined/>";
        } else if (expr.indexOf('Arbiter.inform("flash/logEvent') >= 0) {
          return "<undefined/>";
        }


//        if (expr.indexOf('jwplayer.utils.tea.decrypt') >= 0) {
//          return "<string></string>";
//        } else if (expr.indexOf('jwplayer.embed.flash.getVars') >= 0) {
//          var base = document.location.href;
//          base = base.substring(0, base.lastIndexOf('inspector.html'));
//          return '<object><property id="aspectratio"><string>56.25%</string></property><property id="playlist"><array><property id="0"><object><property id="sources"><array><property id="0"><object><property id="file"><string>../videoplayer/big_buck_bunny.mp4</string></property><property id="default"><false/></property></object></property></array></property><property id="tracks"><array></array></property><property id="image"><string>../examples/image-loading/firefox.png</string></property><property id="title"><string>test</string></property></object></property></array></property><property id="id"><string>' + objId + '</string></property><property id="base"><string>' + base + '</string></property></object>';
//        } else if (expr.indexOf('jwplayer.playerReady') >= 0) {
//          // TODO client calls back jwAddEventListener, jwGetWidth/jwGetHeight
//          return "<undefined/>";
//        } else {
//          throw new Error('Unexpected ExternalInterfaceService::eval()');
//        }
//        throw new Error('Unexpected ExternalInterfaceService::eval()');
      },
      call: function (request) {
        throw new Error('Unexpected ExternalInterfaceService::call()');
      },
      getId: function () {
        return 'swf_id_54513f6f394db3a80901924';
      // params=%7B%22autoplay%22%3Afalse%2C%22auto_hd%22%3Afalse%2C%22autoplay_reason%22%3A%22unknown%22%2C%22autoplay_setting%22%3Anull%2C%22autorewind%22%3Atrue%2C%22click_to_snowlift%22%3Afalse%2C%22default_hd%22%3Afalse%2C%22dtsg%22%3A%22AQHj7qqI9OSB%22%2C%22inline_player%22%3Afalse%2C%22lsd%22%3Anull%2C%22min_progress_update%22%3A300%2C%22pixel_ratio%22%3A1%2C%22player_origin%22%3A%22unknown%22%2C%22preload%22%3Atrue%2C%22source%22%3A%22snowlift%22%2C%22start_index%22%3A0%2C%22start_muted%22%3Afalse%2C%22stream_type%22%3A%22stream%22%2C%22use_spotlight%22%3Afalse%2C%22video_data%22%3A%5B%7B%22hd_src%22%3Anull%2C%22is_hds%22%3Afalse%2C%22is_hls%22%3Afalse%2C%22index%22%3A0%2C%22rotation%22%3A0%2C%22sd_src%22%3A%22https%3A%5C%2F%5C%2Ffbcdn-video-a-a.akamaihd.net%5C%2Fhvideo-ak-xaf1%5C%2Fv%5C%2Ft42.1790-2%5C%2F10463192_744029042321264_667496182_n.mp4%3Foh%3De58e9c10eb34e57202eacb9cf053907d%26oe%3D54515C3B%26__gda__%3D1414618436_6c4bf5a9696c2a7bc9e1d6d2031c975e%22%2C%22thumbnail_src%22%3A%22https%3A%5C%2F%5C%2Ffbcdn-vthumb-a.akamaihd.net%5C%2Fhvthumb-ak-xfa1%5C%2Fv%5C%2Ft15.0-10%5C%2F10549521_744029078987927_744028752321293_49060_1841_b.jpg%3Foh%3D04ca2eacb4c13c4f7fe93a0ac3c5d39a%26oe%3D54F762B6%26__gda__%3D1424481427_b36d5a76b5c644a2c08d22726efcf886%22%2C%22thumbnail_height%22%3A300%2C%22thumbnail_width%22%3A400%2C%22video_duration%22%3A100%2C%22video_id%22%3A%22744028752321293%22%2C%22subtitles_src%22%3Anull%7D%5D%2C%22show_captions_default%22%3Afalse%2C%22persistent_volume%22%3Atrue%2C%22buffer_length%22%3A0.1%7D&amp;width=520&amp;height=390&amp;user=653138652&amp;log=no&amp;div_id=id_54513f6f394db3a80901924&amp;swf_id=swf_id_54513f6f394db3a80901924&amp;browser=Firefox+36.0&amp;tracking_domain=https%3A%2F%2Fpixel.facebook.com&amp;post_form_id=&amp;string_table=https%3A%2F%2Fs-static.ak.facebook.com%2Fflash_strings.php%2Ft98236%2Fen_US

      //  <embed type="application/x-shockwave-flash" src="https://fbstatic-a.akamaihd.net/rsrc.php/v1/yP/r/079p_DX3PYM.swf" style="display: block;" id="swf_id_54513f6f394db3a80901924" name="swf_id_54513f6f394db3a80901924" bgcolor="#000000" quality="high" allowfullscreen="true" allowscriptaccess="always" salign="tl" scale="noscale" wmode="opaque" flashvars="params=%7B%22autoplay%22%3Afalse%2C%22auto_hd%22%3Afalse%2C%22autoplay_reason%22%3A%22unknown%22%2C%22autoplay_setting%22%3Anull%2C%22autorewind%22%3Atrue%2C%22click_to_snowlift%22%3Afalse%2C%22default_hd%22%3Afalse%2C%22dtsg%22%3A%22AQHj7qqI9OSB%22%2C%22inline_player%22%3Afalse%2C%22lsd%22%3Anull%2C%22min_progress_update%22%3A300%2C%22pixel_ratio%22%3A1%2C%22player_origin%22%3A%22unknown%22%2C%22preload%22%3Atrue%2C%22source%22%3A%22snowlift%22%2C%22start_index%22%3A0%2C%22start_muted%22%3Afalse%2C%22stream_type%22%3A%22stream%22%2C%22use_spotlight%22%3Afalse%2C%22video_data%22%3A%5B%7B%22hd_src%22%3Anull%2C%22is_hds%22%3Afalse%2C%22is_hls%22%3Afalse%2C%22index%22%3A0%2C%22rotation%22%3A0%2C%22sd_src%22%3A%22https%3A%5C%2F%5C%2Ffbcdn-video-a-a.akamaihd.net%5C%2Fhvideo-ak-xaf1%5C%2Fv%5C%2Ft42.1790-2%5C%2F10463192_744029042321264_667496182_n.mp4%3Foh%3De58e9c10eb34e57202eacb9cf053907d%26oe%3D54515C3B%26__gda__%3D1414618436_6c4bf5a9696c2a7bc9e1d6d2031c975e%22%2C%22thumbnail_src%22%3A%22https%3A%5C%2F%5C%2Ffbcdn-vthumb-a.akamaihd.net%5C%2Fhvthumb-ak-xfa1%5C%2Fv%5C%2Ft15.0-10%5C%2F10549521_744029078987927_744028752321293_49060_1841_b.jpg%3Foh%3D04ca2eacb4c13c4f7fe93a0ac3c5d39a%26oe%3D54F762B6%26__gda__%3D1424481427_b36d5a76b5c644a2c08d22726efcf886%22%2C%22thumbnail_height%22%3A300%2C%22thumbnail_width%22%3A400%2C%22video_duration%22%3A100%2C%22video_id%22%3A%22744028752321293%22%2C%22subtitles_src%22%3Anull%7D%5D%2C%22show_captions_default%22%3Afalse%2C%22persistent_volume%22%3Atrue%2C%22buffer_length%22%3A0.1%7D&amp;width=520&amp;height=390&amp;user=653138652&amp;log=no&amp;div_id=id_54513f6f394db3a80901924&amp;swf_id=swf_id_54513f6f394db3a80901924&amp;browser=Firefox+36.0&amp;tracking_domain=https%3A%2F%2Fpixel.facebook.com&amp;post_form_id=&amp;string_table=https%3A%2F%2Fs-static.ak.facebook.com%2Fflash_strings.php%2Ft98236%2Fen_US" height="390" width="520">
      }
    };
  }
}

function requestYT(yt) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest({mozSystem: true});
    xhr.open('GET', 'http://www.youtube.com/watch?v=' + yt, true);
    xhr.onload = function (e) {
      var config = JSON.parse(/ytplayer\.config\s*=\s*(.+?);<\/script/.exec(xhr.responseText)[1]);
      // HACK removing FLVs from the fmt_list
      config.args.fmt_list = config.args.fmt_list.split(',').filter(function (s) {
        var fid = s.split('/')[0];
        return fid !== '5' && fid !== '34' && fid !== '35'; // more?
      }).join(',');

      resolve(config);
    };
    xhr.onerror = function () {
      reject(xhr.error);
    };
    xhr.send(null);
  });
}

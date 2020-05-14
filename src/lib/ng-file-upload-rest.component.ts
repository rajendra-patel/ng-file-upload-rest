import { Component, OnInit, Input, Output,EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'ng-file-upload-rest',
  template: `
    <div id="mainDiv" class="mDiv">
        <div id="inputDiv" class="iDiv">
            <input type="file" id="myfile" name="myfile" class="input" (change)="selectedFile()"/>
        </div>
        <div id="uploadDiv" class="uDiv">
            <input type="button" id="upload" value="Upload" (click)="uploadFile()" class="upload" />
        </div>
    </div>
  `
})
export class NgFileUploadRestComponent implements OnInit {
  constructor(private el: ElementRef) { }
  @Input('url') url;
  @Input() styles: string;
  @Output() submit: EventEmitter<{Status: String, Response: String}> = new EventEmitter();

  
  ngOnInit() {
    this.createStyle(this.styles);
  }
  
  selectedFile() {
    let selectedFiles: any = document.getElementById("myfile");
    var submitButton: any = document.getElementById("upload");
    var file = selectedFiles.files[0];
    if (file) {
      /*
        let fileSizeString = "";
        if (file.size > 1048576)
          fileSizeString = (Math.round(file.size * 100 / 1048576) / 100).toString() + ' MB';
        else
          fileSizeString = (Math.round(file.size * 100 / 1024) / 100).toString() + ' Kb';
        var divfileSize = document.getElementById('fileSize');
        var divfileType = document.getElementById('fileType');
        divfileSize.innerHTML = 'File Size : ' + fileSizeString;
        */

        this.loadMime(file, function(mime) {
          if(mime==undefined)
            submitButton.disabled = true;
          else
            submitButton.disabled = false;
        });
    }
  }

  loadMime(file, callback) {

    //List of known mimes
    
    //image mimetype
    var imageMimes = [
        {//.jpg
          mime: 'image/jpeg',
          pattern: [0xFF, 0xD8, 0xFF],
          mask: [0xFF, 0xFF, 0xFF]
        },
        {//.jp2
          mime: 'image/jp2',
          pattern: [0x00, 0x00, 0x00, 0x0C, 0x6A, 0x50, 0x20, 0x20, 0x0D, 0x0A, 0x87, 0x0A, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0x6A, 0x70, 0x32],
          mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF]
        },
        {//.jpx
          mime: 'image/jpx',
          pattern: [0x00, 0x00, 0x00, 0x0C, 0x6A, 0x50, 0x20, 0x20, 0x0D, 0x0A, 0x87, 0x0A, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0x6A, 0x70, 0x78],
          mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF]
        },
        {//.jpm
          mime: 'image/jpm',
          pattern: [0x00, 0x00, 0x00, 0x0C, 0x6A, 0x50, 0x20, 0x20, 0x0D, 0x0A, 0x87, 0x0A, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0x6A, 0x70, 0x6d],
          mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF]
        },
        {//.mj2
          mime: 'image/mj2',
          pattern: [0x00, 0x00, 0x00, 0x0C, 0x6A, 0x50, 0x20, 0x20, 0x0D, 0x0A, 0x87, 0x0A, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0x6d, 0x6a, 0x32],
          mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF]
        },
        {//.png
          mime: 'image/png',
          pattern: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
          mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
        },
        {//.gif
          mime: 'image/gif',
          pattern: [0x47, 0x49, 0x46, 0x38],
          mask: [0xFF, 0xFF, 0xFF, 0xFF]
        },
        {//.webp
          mime: 'image/webp',
          pattern: [0x52, 0x49, 0x46, 0x46, undefined, undefined, undefined, undefined, 0x57, 0x45, 0x42, 0x50, 0x56, 0x50],
          mask: [0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
        },
        {//.ico
          mime: 'image/x-icon',
          pattern: [0x00, 0x00, 0x01, 0x00],
          mask: [0xFF, 0xFF, 0xFF, 0xFF]
        },
        {//.bmp
          mime: 'image/bmp',
          pattern: [0x42, 0x4D],
          mask: [0xFF, 0xFF]
        },
        {//.tiff || tif
          mime: 'image/tiff',
          pattern: [0x49, 0x20, 0x49],
          mask: [0xFF, 0xFF, 0xFF]
        },
        {//.tiff || tif
          mime: 'image/tiff',
          pattern: [0x49, 0x49, 0x2A, 0x00],
          mask: [0xFF, 0xFF, 0xFF, 0xFF]
        },
        {//.tiff || tif
          mime: 'image/tiff',
          pattern: [0x4D, 0x4D, 0x00, 0x2A],
          mask: [0xFF, 0xFF, 0xFF, 0xFF]
        },
        {//.tiff || tif
          mime: 'image/tiff',
          pattern: [0x4D, 0x4D, 0x00, 0x2B],
          mask: [0xFF, 0xFF, 0xFF, 0xFF]
        },
        {// .xml .svg
          mime: 'image/svg',
          pattern: [0x3c, 0x3f, 0x78, 0x6d, 0x6c],
          mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
        },
        {// .jxr
          mime: 'image/vnd.ms-photo',
          pattern: [0x49, 0x49, 0xBC],
          mask: [0xFF, 0xFF, 0xFF]
        },
        {//.bpg
          mime: 'image/bpg',
          pattern: [0x42, 0x50, 0x47, 0xFB],
          mask: [0xFF, 0xFF, 0xFF, 0xFF]
        }

        // you can expand this list @see https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern
    ];
    

    // audio mimetype
    var audioMimes = [
      {//mp3 layer 1
        mime: 'audio/mpeg',
        pattern: [0xFF, 0xE0],
        mask: [0xFF, 0xF0]
      },
      {//mp3 layer 2
        mime: 'audio/mpeg',
        pattern: [0xFF, 0xF0],
        mask: [0xFF, 0xF0]
      },
      {//.aac mpeg-4
        mime: 'audio/aac',
        pattern: [0xFF, 0xF1],
        mask: [0xFF, 0xFF]
      },
      {//.aac mpeg-2
        mime: 'audio/aac',
        pattern: [0xFF, 0xF9],
        mask: [0xFF, 0xFF]
      },
      {//.amr
        mime: 'audio/amr',
        pattern: [0x23, 0x21, 0x41, 0x4D, 0x52],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.wav
        mime: 'audio/vnd-wave',
        pattern: [0x52, 0x49, 0x46, 0x46, undefined, undefined, undefined, undefined, 0x57, 0x41, 0x56, 0x45, 0x66, 0x6D, 0x74, 0x20],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.wma || .asf
        mime: 'audio/x-ms-wma',
        pattern: [0x30, 0x26, 0xB2, 0x75, 0x8E, 0x66, 0xCF, 0x11, 0xA6, 0xD9, 0x00, 0xAA, 0x00, 0x62, 0xCE, 0x6C],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.wv
        mime: 'audio/wavpack',
        pattern: [0x77, 0x76, 0x70, 0x6b],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//mp3
        mime: 'audio/mpeg',
        pattern: [0x49, 0x44, 0x33],
        mask: [0xFF, 0xFF, 0xFF]
      },
      {//mpc
        mime: 'audio/x-musepack',
        pattern: [ 0x4d, 0x50, 0x2b],
        mask: [0xFF, 0xFF, 0xFF]
      },
      {//.ac3
        mime: 'audio/vnd.dolby.dd-raw',
        pattern: [0x0B, 0x77],
        mask: [0xFF, 0xFF]
      },
      {//.mpc
        mime: 'audio/x-musepack',
        pattern: [0x4d, 0x50, 0x43, 0x4b],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.aif
        mime: 'audio/aiff',
        pattern: [0x46, 0x4f, 0x52, 0x4d],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.m4a
        mime: 'audio/m4a',
        pattern: [undefined, undefined, undefined, undefined, 0x66, 0x74, 0x79, 0x70, 0x4D, 0x34, 0x41, 0x20],
        mask: [0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.mid
        mime: 'audio/midi',
        pattern: [0x4d, 0x54, 0x68, 0x64],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.flac
        mime: 'audio/x-flac',
        pattern: [0x66, 0x4c, 0x61, 0x43],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      }      
    ];

    //video mimetypes
    var videoMimes = [
      {//.mpg ps || mpeg
        mime: 'video/MP1S',
        pattern: [0x00, 0x00, 0x01, 0xBA, 0x21],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xF1]
      },
      {//.mpg m2b || vob || sub
        mime: 'video/MP2P',
        pattern: [0x00, 0x00, 0x01, 0xBA, 0x44],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xC4]
      },
      {//.mpg
        mime: 'video/mpeg',
        pattern: [0x00, 0x00, 0x01, 0xBA],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.mpg
        mime: 'video/mpeg',
        pattern: [0x00, 0x00, 0x01, 0xB3],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.wmv
        mime: 'video/x-ms-asf',
        pattern: [0x30, 0x26, 0xB2, 0x75, 0x8E, 0x66, 0xCF, 0x11, 0xA6, 0xD9, 0x00, 0xAA, 0x00, 0x62, 0xCE, 0x6C],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.avi
        mime: 'video/avi',
        pattern: [0x52, 0x49, 0x46, 0x46, undefined, undefined, undefined, undefined, 0x41, 0x56, 0x49, 0x20, 0x4C, 0x49, 0x53, 0x54],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//mov
        mime: 'video/quicktime',
        pattern: [undefined, undefined, undefined, undefined, 0x66, 0x74, 0x79, 0x70, 0x71, 0x74, 0x20, 0x20],
        mask: [0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.mov
        mime: 'video/quicktime',
        pattern: [undefined, undefined, undefined, undefined, 0x66, 0x72, 0x65, 0x65],
        mask: [0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.mov
        mime: 'video/quicktime',
        pattern: [undefined, undefined, undefined, undefined, 0x6D, 0x64, 0x61, 0x74],
        mask: [0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.mov
        mime: 'video/quicktime',
        pattern: [undefined, undefined, undefined, undefined, 0x6D, 0x6F, 0x6F, 0x76],
        mask: [0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.mov
        mime: 'video/quicktime',
        pattern: [undefined, undefined, undefined, undefined, 0x77, 0x69, 0x64, 0x65],
        mask: [0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.m4v -> m4v || flv || m4vh || m4vp
        mime: 'video/mp4',
        pattern: [undefined, undefined, undefined, undefined, 0x66, 0x74, 0x79, 0x70, 0x4D, 0x34, 0x56, 0x20],
        mask: [0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.m4p
        mime: 'video/mp4',
        pattern: [undefined, undefined, undefined, undefined, 0x66, 0x74, 0x79, 0x70, 0x4D, 0x34, 0x56, 0x20],
        mask: [0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.mp4 iso mpeg4 v1
        mime: 'video/mp4',
        pattern: [undefined, undefined, undefined, undefined, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6F, 0x6D],
        mask: [0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.m4v qt || mpeg4 v2
        mime: 'video/mp4',
        pattern: [undefined, undefined, undefined, undefined, 0x66, 0x74, 0x79, 0x70, 0x6D, 0x70, 0x34, 0x32],
        mask: [0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.webm mkv || webm
        mime: 'video/webm',
        pattern: [0x1A, 0x45, 0xDF, 0xA3],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.mkv mkv || webm
        mime: 'video/mkv',
        pattern: [0x1A, 0x45, 0xDF, 0xA3],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.flv
        mime: 'video/x-flv',
        pattern: [0x46, 0x4C, 0x56, 0x01],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      }      
    ];

    //archive mimetypes
    var archiveMimes = [
      {//zip
        mime: 'application/zip',
        pattern: [0x50, 0x4b, 0x03, 0x04],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.gz || .tgz
        mime: 'application/gzip',
        pattern: [0x1F, 0x8B, 0x08],
        mask: [0xFF, 0xFF, 0xFF]
      },
      {//bz2
        mime: 'application/x-bzip2',
        pattern: [0x42, 0x5A, 0x68],
        mask: [0xFF, 0xFF, 0xFF]
      },
      {//.lz
        mime: 'application/x-lzip',
        pattern: [0x4c, 0x5a, 0x49, 0x50],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.7z
        mime: 'application/x-7z-compressed',
        pattern: [0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.rar
        mime: 'application/x-rar-compressed',
        pattern: [0x52, 0x61, 0x72, 0x21, 0x1A, 0x07, 0x00],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.rar v5
        mime: 'application/x-rar-compressed',
        pattern: [0x52, 0x61, 0x72, 0x21, 0x1A, 0x07, 0x01, 0x00],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      }
    ];

    //document mimetypes
    var documentMimes = [
      {//.rtf
        mime: 'application/rtf',
        pattern: [0x7B, 0x5C, 0x72, 0x74, 0x66],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.pdf
        mime: 'application/pdf',
        pattern: [0x25, 0x50, 0x44, 0x46],
        mask: [0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//docx pptx xlsx
        mime: 'application/vnd.openxmlformats-officedocument',
        pattern: [0x50 , 0x4B, 0x03, 0x04, 0x14, 0x00, 0x06, 0x00],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.docx
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        pattern: [0x50, 0x4B, 0x03, 0x04, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0x77, 0x6F, 0x72, 0x64],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF]
      },
      {//.pptx
        mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        pattern: [0x50 , 0x4B, 0x03, 0x04, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0x70, 0x70, 0x74],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF]
      },
      {//.xlsx
        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        pattern: [0x50 , 0x4B, 0x03, 0x04, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0x78, 0x6c],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF]
      },
      {//.xml
        mime: 'application/xml',
        pattern: [0x3C, 0x3F, 0x78, 0x6D, 0x6C, 0x20, 0x76, 0x65, 0x72, 0x73, 0x69, 0x6F, 0x6E, 0x3D],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      },{//.doc .ppt .xls
        mime: 'application/ms-office',
        pattern: [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1],
        mask: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
      }
    ];


        // optimizing mimetype array search

    var mimes = [];
    var fileMime = file.type.split("/");
    switch(fileMime[0]){
      case "image":
        mimes=imageMimes;
        break;
      case "audio":
        mimes=audioMimes;
        break;
      case "video":
        mimes=videoMimes;
        break;
      case "application":
        if(fileMime[1].includes("zip")||fileMime[1].includes("compressed"))
          mimes.push(...archiveMimes);
        else
          mimes.push(...documentMimes);
        break;
      default:
        mimes.push(...imageMimes);
        mimes.push(...audioMimes);
        mimes.push(...videoMimes);
        mimes.push(...archiveMimes);
        mimes.push(...documentMimes);
    }

    function check(bytes, mime) {
        for (var i = 0, l = mime.mask.length; i < l; ++i) {
          console.log(i+'read from file :'+bytes[i]+'\t'+'mask :'+mime.mask[i]+     '\n'+'pattern :'+mime.pattern[i]+'\t'+'mask :'+mime.mask[i]);
          console.log('\n'+(bytes[i] & mime.mask[i]) +'\t'+(mime.pattern[i] & mime.mask[i]));
            if (((bytes[i] & mime.mask[i]) - (mime.pattern[i] & mime.mask[i])) !== 0) {
                return false;
            }
        }
        return true;
    }
  
    var blob = file.slice(0, 50); //read the first 4 bytes of the file
    console.log("Blob"+blob);
  
    var reader = new FileReader();
    reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
            var bytes = new Uint8Array(reader.result as ArrayBuffer);
  
            for (var i=0, l = mimes.length; i<l; ++i) {
                if (check(bytes, mimes[i])) 
                {
                  console.log("File Type :"+mimes[i].mime);
                  return callback(mimes[i].mime);
                }
            }
            console.log("File Type :"+file.type);
            return callback(undefined);
        }
    };
    reader.readAsArrayBuffer(blob);
  }

  uploadFile(){
    let self = this;
  
    let selectedFiles:any = document.getElementById("myfile");
    var file = selectedFiles.files[0];

    var fd = new FormData();
    fd.append("file", file, file.name);

    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.upload.addEventListener("progress", this.progressFunction, false);
    xmlHTTP.addEventListener("load", this.transferCompleteFunction, false);
    xmlHTTP.addEventListener("error", this.uploadFailed, false);
    xmlHTTP.addEventListener("abort", this.uploadCanceled, false);
    xmlHTTP.onreadystatechange = function() {
      if (xmlHTTP.readyState == XMLHttpRequest.DONE && xmlHTTP.status == 200) {
          let emittedObject = {Status: xmlHTTP.statusText, Response: xmlHTTP.responseText};
          self.submit.emit(emittedObject);
      }
  }
    xmlHTTP.open("POST", this.url, true);
    xmlHTTP.send(fd);
  }

  progressFunction(evt){
    var uploadButton:any = document.getElementById("upload");
    if (evt.lengthComputable) {
        uploadButton.value = "Please Wait...";
        uploadButton.disabled = true;
    } else {
      uploadButton.value = "Upload";
      uploadButton.disabled = false;
    }
  }

  loadStartFunction(evt){
    var uploadButton:any = document.getElementById("upload");
    uploadButton.value = "Upload";
    uploadButton.disabled = false;
  }

  transferCompleteFunction(evt){
    var uploadButton:any = document.getElementById("upload");
    uploadButton.value = "Upload";
    uploadButton.disabled = false;
  }   

  uploadFailed(evt) {
    var uploadButton:any = document.getElementById("upload");
    uploadButton.value = "Upload";
    uploadButton.disabled = false;
  }

  uploadCanceled(evt) {
    var uploadButton:any = document.getElementById("upload");
    uploadButton.value = "Upload";
    uploadButton.disabled = false;
  }

  createStyle(style: string): void {
    const styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(style));
    this.el.nativeElement.appendChild(styleElement);
  }
}

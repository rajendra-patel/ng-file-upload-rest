# NgFileUploadRest

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Install

NPM: npm install ng-file-upload-rest


## Usage
```html
<ng-file-upload-rest></ng-file-upload-rest>
```

#### Url  

The url property accepts the upload api url address as a string
```html
<ng-file-upload-rest url="http://localhost:8080/upload"></ng-file-upload-rest>
```

#### Styles

The styles property accepts the css for the whole component as a string.  
The component has the following structure
```html
    <div id="mainDiv" class="mDiv">
        <div id="inputDiv" class="iDiv">
            <input type="file" id="myfile" name="myfile" class="input" (change)="selectedFile()"/>
        </div>
        <div id="uploadDiv" class="uDiv">
            <input type="button" id="upload" value="Upload" (click)="uploadFile()" class="upload" />
        </div>
    </div>
```
You may create the css using id or class as illustrated below and pass the string to the styles property
```html
    <ng-file-upload-rest styles=" .mDiv { background-color: gray; } .input { color: red; } .upload { color: red; }"></ng-file-upload-rest>
    
    <ng-file-upload-rest styles=" #mainDiv { display: block; } input[name=myfile] { pointer-events: none; } #inputDiv { cursor: pointer; }"></ng-file-upload-rest>
```

#### Submit

The submit event currently emits an object with two properties  
{Status: String, Response: String}  

Status and Response are the statusText and responseText returned from the xmlHTTP post call respectively  
*more soon to come*


## Supported Types

#### Images

.jpg 'image/jpeg'  
.jp2 'image/jp2'  
.jpx 'image/jpx'  
.jpm 'image/jpm'  
.mj2 'image/mj2'  
.png 'image/png'  
.gif 'image/gif'  
.webp 'image/webp'  
.ico 'image/x-icon'  
.bmp 'image/bmp'  
.tiff, .tif 'image/tiff'  
.xml, .svg 'image/svg'  
.jxr 'image/vnd.ms-photo'  
.bpg 'image/bpg'

#### Audio

.mp3 layer 1 'audio/mpeg'  
.mp3 layer 2 'audio/mpeg'  
.aac mpeg-4 'audio/aac'  
.aac mpeg-2 'audio/aac'  
.amr 'audio/amr'  
.wav 'audio/vnd-wave'  
.wma, .asf 'audio/x-ms-wma'  
.wv 'audio/wavpack'  
.mp3 'audio/mpeg'  
.mpc 'audio/x-musepack'  
.ac3 'audio/vnd.dolby.dd-raw'  
.mpc 'audio/x-musepack'  
.aif 'audio/aiff'  
.m4a 'audio/m4a'  
.mid 'audio/midi'  
.flac 'audio/x-flac'

#### Video

.mpg ps, mpeg 'video/MP1S'  
.mpg m2b, vob, sub 'video/MP2P'  
.mpg 'video/mpeg'  
.mpg 'video/mpeg'  
.wmv 'video/x-ms-asf'  
.avi 'video/avi'  
.mov 'video/quicktime'  
.mov 'video/quicktime'  
.mov 'video/quicktime'  
.mov 'video/quicktime'  
.mov 'video/quicktime'  
.m4v flv, m4vh, m4vp 'video/mp4'  
.m4p 'video/mp4'  
.mp4 iso mpeg4 v1 'video/mp4'  
.m4v qt, mpeg4 v2 'video/mp4'  
.webm, mkv 'video/webm'  
.mkv, webm 'video/mkv'  
.flv 'video/x-flv'

#### Archive

.zip 'application/zip'  
.gz, .tgz 'application/gzip'  
.bz2 'application/x-bzip2'  
.lz 'application/x-lzip'  
.7z 'application/x-7z-compressed'  
.rar 'application/x-rar-compressed'  
.rar v5 'application/x-rar-compressed'

#### Documents

.rtf 'application/rtf'  
.pdf 'application/pdf'  
.docx 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'  
.pptx 'application/vnd.openxmlformats-officedocument.presentationml.presentation'  
.xlsx 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'  
.xml 'application/xml'  
.doc 'application/msword'  
.ppt 'application/vnd.ms-powerpoint'  
.xls 'application/vnd.ms-excel'  

*more soon to come*  


## CORS  
To support CORS upload your server needs to allow cross domain requests. You can achieve that by having a filter or interceptor on your upload file server to add CORS headers to the response similar to this: (sample java code)

```java
    httpResp.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS");  
    httpResp.setHeader("Access-Control-Allow-Origin", "your.other.server.com");  
    httpResp.setHeader("Access-Control-Allow-Headers", "Content-Type"));  
```

Alternatively you may add [Allow CORS: Access-Control-Allow-Origin](https://mybrowseraddon.com/access-control-allow-origin.html "Allow CORS: Access-Control-Allow-origin") extension to you browser
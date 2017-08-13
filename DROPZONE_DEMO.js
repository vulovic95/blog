  <form action="http://localhost:3000/api/upload" encType="multipart/form-data">
     <div className="dropzone" id="dropzone"  onDragOver={props.ondragover} onDragLeave={props.ondragleave} onDrop={props.ondrop} > Drop files to upload  </div>
  </form>  
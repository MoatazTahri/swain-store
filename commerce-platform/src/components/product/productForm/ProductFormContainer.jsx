import React, {useState} from 'react';

function ProductFormContainer({page}) {
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()

    const [preview, setPreview] = useState([]);
    const uploadedImages= [];

    const changedHandler = (event) => {
        preview.length = 0
        let files = event.target.files;
        uploadedImages.push(files);
        let reader;

        for (let i = 0; i < uploadedImages[0].length; i++) {
            reader = new FileReader();
            reader.readAsDataURL(uploadedImages[0][i]);
            reader.onload = event => {
                preview.push(event.target.result);   // update the array instead of replacing the entire value of preview
                setPreview([...new Set(preview)]); // spread into a new array to trigger rerender
            }
        }
    }

    return (
        <div>
            {(1 === page) &&
                <div id="form-1">
                    <div className="form-group">
                        <label className="label" htmlFor="name">Name</label>
                        <input type="text" className="form-control" placeholder="Product Name"
                               value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="price">Price ($)</label>
                        <input type="number" className="form-control" placeholder="Product Price"
                               value={price}
                               onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label className="upload-label" htmlFor="image">Image</label>
                        <input type="file" className="form-control upload-button" placeholder="Add images for product"/>
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="description">Description</label>
                        <textarea rows="5" className="form-control"
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
            }
            {(2 === page) &&
                <div id="form-2">
                    <div className="form-group">
                        <div className="Neon Neon-theme-dragdropbox">
                            <input name="files[]" id="filer_input2" multiple="multiple" type="file" onChange={(e) => changedHandler(e)}/>
                            <div className="Neon-input-dragDrop">
                                <div className="Neon-input-inner">
                                    <div className="Neon-input-icon">
                                        <i className="fa fa-file-image-o"></i>
                                    </div>
                                    <div className="Neon-input-text">
                                        <h3>Drag&Drop files here</h3>
                                        <span style={{display:"inline-block", margin: "15px 0"}}>or</span>
                                    </div>
                                    <a className="Neon-input-choose-btn blue">Browse Files</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 p-2">
                            <div style={{
                                backgroundColor:'#dfdfdf',
                                borderRadius:'20px',
                                height: '150px',
                                width: '200px',
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center"}}>
                                <span className='fa fa-circle-plus' style={{fontSize:42}}/>
                            </div>
                        </div>
                        <div className="col-md-6 p-2">
                            <div style={{
                                backgroundColor: '#dfdfdf',
                                borderRadius: '20px',
                                height: '150px',
                                width: '200px',
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <span className='fa fa-circle-plus' style={{fontSize: 42}}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProductFormContainer;
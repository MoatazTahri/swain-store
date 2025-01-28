import React, {useState} from 'react';
import "../../../assets/css/product-form.scss"
import ProductFormContainer from "./ProductFormContainer.jsx";

function ProductFormComponent() {
    const [currentFormPage, setCurrentFormPage] = useState(1)
    const formPages = {max: 2, min: 1}

    function nextFormPage() {
        if (currentFormPage + 1 <= formPages.max) {
            setCurrentFormPage(currentFormPage + 1)
        }
    }

    function previousFormPage() {
        if (currentFormPage - 1 >= formPages.min) {
            setCurrentFormPage(currentFormPage - 1)
        }
    }

    function formButtons() {
        const saveButton = <button type="submit" className="submit-button"><span className="fa fa-check"></span></button>
        const previousButton = <button className="submit-button" onClick={() => previousFormPage()}><span className="fa fa-arrow-left"></span></button>
        const nextButton = <button className="submit-button" onClick={() => nextFormPage()}><span className="fa fa-arrow-right"></span></button>
        return (
            <div>
                {formPages.min < currentFormPage && previousButton}
                {formPages.max === currentFormPage && saveButton}
                {formPages.max > currentFormPage && nextButton}
            </div>
        )
    }

    return (
        <div className="product-form-background">
            <section className="product-form-section">
                <div className="container">
                <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">Add Product</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="product-form col-md-7 col-lg-5">
                            <div className="login-wrap p-4 p-md-5">
                                <form action="#" className="insert-product-form">
                                    <ProductFormContainer page={currentFormPage}/>
                                </form>
                                <div className="form-group d-flex justify-content-end mt-5">
                                    {formButtons()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductFormComponent;
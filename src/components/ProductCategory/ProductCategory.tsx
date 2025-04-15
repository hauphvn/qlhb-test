interface ProductCategoryProps {
    options: { value: number, label: string }[],

}

const ProductCategory = (props: ProductCategoryProps) => {
    const {options} = props;
    console.log(options)
    return (
        <div>

        </div>
    );
};

export default ProductCategory;

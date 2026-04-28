const generateMessage = (entity:string)=>({
    found:`${entity} is found successfully`,
    notFound:`${entity} is not found`,
    alreadyExist:`${entity} is already exist`,
    created:`${entity} is created successfully`,
    updated:`${entity} is updated successfully`,
    deleted:`${entity} is deleted successfully`,
    failToCreated:`${entity} is failed to be created`,
    failToUpdated:`${entity} is failed to be Updated`,
    failToDeleted:`${entity} is failed to be deleted`,
})

export const MESSAGE = {
    user:{...generateMessage('user')},
    admin:{...generateMessage('admin')},
    seller:{...generateMessage('seller')},
    customer:{...generateMessage('customer')},
    brand:{...generateMessage('brand')},
    category:{...generateMessage('category')},
    product:{...generateMessage('product')},
    cart:{...generateMessage('cart')},
}
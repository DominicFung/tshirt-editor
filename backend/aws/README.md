# AWS Infrastructure support for Print on Demand

### Preface - Why is Cloud Infrastructure needed?

> Since Printful / Printify are CORS protected backend APIs - we need our own cloud infrastructure. Most platforms also don't have an internal storage (relying on an image storage you provide). To keep cost low, our IaC uses serverless solutions when possible.

<br />

#### **Printful Flow**:
- [x] Add File from S3 using File API
- [ ] Use File in Product Creation: [Documentation](https://developers.printful.com/docs/#tag/Products-API)
- [ ] Add product to Storefront
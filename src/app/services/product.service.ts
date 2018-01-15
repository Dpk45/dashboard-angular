import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  private baseUrl = "http://localhost:3000/3.0";
  constructor(private _http: Http, private _httpClient: HttpClient) {

  }

// get product
  getProducts(brand) {
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/products?key=' + brand)
    return this._httpClient.get(_path)
    .map((res: any) => {
      return res;
    });
  }

// get product_by_id
  getProductById(brand, productId) {
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/products?key=' + brand + '&product_id=' + productId)
    return this._httpClient.get(_path)
    .map((res: any) => {
      return res;
    });
  }

// update product
  updateProductById(brand, productId, updateProductData) {
    console.log("form in servie=ce>>>>>>>>>>>>>>>>..", updateProductData)
    brand = brand + "_dev";
    let body: any = JSON.stringify(updateProductData)
    console.log("body>>>>>>>>>>>>>>>>>>",body)
    const _path: string = (this.baseUrl + '/products/' + productId + '?key=' + brand)
    return this._httpClient.post(_path, body)
    .map((res: any) => {
      return res;
    });
  }

// get style_table
  getLookupStyleData(brand) {
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/lookup/styles?key=' + brand)
    return this._httpClient.get(_path)
    .map((res: any) => {
      return res;
    });
  }

  // get frame_color
  getFrameColor(brand) {
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/lookup/frame_colors?key=' + brand)
    return this._httpClient.get(_path)
    .map((res: any) => {
      return res;
    });
  }

  // get lens_color
  getLenColor(brand) {
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/lookup/lens_colors?key=' + brand)
    return this._httpClient.get(_path)
    .map((res: any) => {
      return res;
    });
  }

// get Template_map
  getTemplateMap(brand) {
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/lookup/template_map?key=' + brand)
    return this._httpClient.get(_path)
    .map((res: any) => {
      return res;
    });
  }


  // create product
  createProduct(brand, productData) {
 console.log("form in servie=ce>>>>>>>>>>>>>>>>..", typeof productData.lens_color)
    brand = brand + "_dev";
    let body: any = JSON.stringify(productData)
    console.log("body>>>>>>>>>>>>>>>>>>",body)
    const _path: string = (this.baseUrl + '/products/?key=' + brand)
    return this._httpClient.post(_path, body)
    .map((res: any) => {
      return res;
    });
  }

  // get list of product collection
  getProductCollectionList(brand) {
    brand = brand + "_dev";
    const _path: string = (this.baseUrl + '/products/collections?key=' + brand)
    return this._http.get(_path)
    .map((res: any) => {
      return res.json();
    });
}

// create product collection
createProductCollection(brand, productCollectionData) {
  brand = brand + "_dev";
  let body: any = JSON.stringify(productCollectionData)
  const _path: string = (this.baseUrl + '/products/collections?key=' + brand)
  return this._httpClient.post(_path, body)
  .map((res: any) => {
    return res;
  });
}

// get product_collection by slug
getProductCollectionBySlug(brand, slug) {
  brand = brand + "_dev";
  const _path: string = (this.baseUrl + '/products/collections/' + slug + '?key=' + brand)
  return this._httpClient.get(_path)
  .map((res: any) => {
    return res;
  });
}

//update product collection
updateProductCollection(brand, productCollectionData, slug) {
  brand = brand + "_dev";
  let body: any = JSON.stringify(productCollectionData)
  const _path: string = (this.baseUrl + '/products/collections/' + slug + '?key=' + brand)
  return this._httpClient.post(_path, body)
  .map((res: any) => {
    return res;
  });
}

// get list of tags
getTagList(brand) {
  brand = brand + "_dev";
  const _path: string = (this.baseUrl + '/products/tags?key=' + brand)
  return this._http.get(_path)
  .map((res: any) => {
    return res.json();
  });
}

//get assets group
getAssetGroup(brand) {
  brand = brand + "_dev";
  const _path: string = (this.baseUrl + '/products/asset_groups?key=' + brand)
  return this._http.get(_path)
  .map((res: any) => {
    return res.json();
  });
}
}

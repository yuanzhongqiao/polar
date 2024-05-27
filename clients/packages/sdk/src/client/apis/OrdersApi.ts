/* tslint:disable */
/* eslint-disable */
/**
 * Polar API
 *  Welcome to the **Polar API** for [polar.sh](https://polar.sh).  This specification contains both the definitions of the Polar HTTP API and the Webhook API.  #### Authentication  Use a [Personal Access Token](https://polar.sh/settings) and send it in the `Authorization` header on the format `Bearer [YOUR_TOKEN]`.  #### Feedback  If you have any feedback or comments, reach out in the [Polar API-issue](https://github.com/polarsource/polar/issues/834), or reach out on the Polar Discord server.  We\'d love to see what you\'ve built with the API and to get your thoughts on how we can make the API better!  #### Connecting  The Polar API is online at `https://api.polar.sh`. 
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  HTTPValidationError,
  ListResourceOrder,
  Order,
  OrderInvoice,
  OrdersStatistics,
  ProductPriceType,
  ResourceNotFound,
} from '../models/index';

export interface OrdersApiGetOrderRequest {
    id: string;
}

export interface OrdersApiGetOrderInvoiceRequest {
    id: string;
}

export interface OrdersApiGetOrdersStatisticsRequest {
    organizationId?: string;
    productId?: string;
}

export interface OrdersApiListOrdersRequest {
    organizationId?: string;
    productId?: string;
    productPriceType?: ProductPriceType;
    userId?: string;
    page?: number;
    limit?: number;
    sorting?: Array<string>;
}

/**
 * 
 */
export class OrdersApi extends runtime.BaseAPI {

    /**
     * Get an order by ID.
     * Get Order
     */
    async getOrderRaw(requestParameters: OrdersApiGetOrderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Order>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getOrder().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/orders/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Get an order by ID.
     * Get Order
     */
    async getOrder(requestParameters: OrdersApiGetOrderRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Order> {
        const response = await this.getOrderRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get an order\'s invoice data.
     * Get Order Invoice
     */
    async getOrderInvoiceRaw(requestParameters: OrdersApiGetOrderInvoiceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrderInvoice>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getOrderInvoice().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/orders/{id}/invoice`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Get an order\'s invoice data.
     * Get Order Invoice
     */
    async getOrderInvoice(requestParameters: OrdersApiGetOrderInvoiceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrderInvoice> {
        const response = await this.getOrderInvoiceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get monthly data about your orders and earnings.
     * Get Orders Statistics
     */
    async getOrdersStatisticsRaw(requestParameters: OrdersApiGetOrdersStatisticsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<OrdersStatistics>> {
        const queryParameters: any = {};

        if (requestParameters['organizationId'] != null) {
            queryParameters['organization_id'] = requestParameters['organizationId'];
        }

        if (requestParameters['productId'] != null) {
            queryParameters['product_id'] = requestParameters['productId'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/orders/statistics`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Get monthly data about your orders and earnings.
     * Get Orders Statistics
     */
    async getOrdersStatistics(requestParameters: OrdersApiGetOrdersStatisticsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<OrdersStatistics> {
        const response = await this.getOrdersStatisticsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List orders.
     * List Orders
     */
    async listOrdersRaw(requestParameters: OrdersApiListOrdersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResourceOrder>> {
        const queryParameters: any = {};

        if (requestParameters['organizationId'] != null) {
            queryParameters['organization_id'] = requestParameters['organizationId'];
        }

        if (requestParameters['productId'] != null) {
            queryParameters['product_id'] = requestParameters['productId'];
        }

        if (requestParameters['productPriceType'] != null) {
            queryParameters['product_price_type'] = requestParameters['productPriceType'];
        }

        if (requestParameters['userId'] != null) {
            queryParameters['user_id'] = requestParameters['userId'];
        }

        if (requestParameters['page'] != null) {
            queryParameters['page'] = requestParameters['page'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['sorting'] != null) {
            queryParameters['sorting'] = requestParameters['sorting'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/api/v1/orders/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * List orders.
     * List Orders
     */
    async listOrders(requestParameters: OrdersApiListOrdersRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResourceOrder> {
        const response = await this.listOrdersRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

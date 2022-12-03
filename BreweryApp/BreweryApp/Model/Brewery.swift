//
//  Brewery.swift
//  BreweryApp
//
//  Created by Tim Kaerts on 24/03/2022.
//

import Foundation

struct Brewery: Hashable, Codable {
    let id: String
    let name: String
    let brewery_type: String
    let street: String?
    let address_2: String?
    let address_3: String?
    let city: String
    let state: String?
    let country_province: String?
    let postal_code: String
    let country: String
    let longitude: String?
    let latitude: String?
    let phone: String?
    let website_url: String?
    let updated_at: String
    let created_at: String
}

var BreweryExample = [
    Brewery(
        id: "12-west-brewing-company-production-facility-mesa",
        name: "Almanac Beer Company",
        brewery_type: "micro",
        street: nil,
        address_2: nil,
        address_3: nil,
        city: "Alameda",
        state: "California",
        country_province: nil,
        postal_code: "94501-5047",
        country: "United States",
        longitude: "-121.8823478",
        latitude: "37.32530178",
        phone: nil,
        website_url: nil,
        updated_at: "2018-08-23T23:24:11.758Z",
        created_at: "2018-08-23T23:24:11.758Z"
    ),
]

//
//  BreweryController.swift
//  BreweryApp
//
//  Created by uitleen on 01/04/2022.
//

import Foundation

class BreweryController: ObservableObject {
    @Published var breweries: [Brewery] = []
    let urlString = "https://api.openbrewerydb.org/breweries"
    
    func fetch() {
        guard let url = URL(string: urlString) else {
            print("ERROR: failed to construct a URL from string")
            return
        }
        
        let task = URLSession.shared.dataTask(with: url) { data, response, error in
            if let error = error {
                print("ERROR: fetch failed: \(error.localizedDescription)")
                return
            }
            guard let data = data else {
                print("ERROR: failed to get data from URLSession")
                return
            }
            do {
                let newBreweries = try JSONDecoder().decode([Brewery].self, from: data)
                DispatchQueue.main.async {
                    self.breweries = newBreweries
                    
                }
            } catch let error as NSError {
                print("ERROR: decoding. In domain= \(error.domain), description \(error.localizedDescription)")
            }
        }
        task.resume()
    }
}

//
//  InformationView.swift
//  BreweryApp
//
//  Created by uitleen on 01/04/2022.
//

import SwiftUI

struct InformationView: View {
    var brewery: Brewery
    
    var body: some View {
        HStack {
            Spacer()
            VStack (alignment: .leading) {
                Text("City:")
                Text("Country:")
                Text("Postal code:")
            }
            .padding()
            VStack (alignment: .leading) {
                Text("\(brewery.city)")
                Text("\(brewery.country)")
                Text("\(brewery.postal_code)")
            }
            .padding()
            Spacer()
        }
        .foregroundColor(.secondary)
    }
}

struct InformationView_Previews: PreviewProvider {
    static var previews: some View {
        InformationView(brewery: BreweryExample[0])
    }
}

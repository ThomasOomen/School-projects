//
//  BingeRow.swift
//  BreweryApp
//
//  Created by Tim Kaerts on 23/03/2022.
//

import SwiftUI

struct BingeRow: View {
    var brewery: Brewery
    
    var body: some View {
        HStack {
            Text(brewery.name)
                .bold()
        }
        .padding(3)
    }
}

struct BingeRow_Previews: PreviewProvider {
    static var previews: some View {
        BingeRow(brewery: BreweryExample[0])
    }
}

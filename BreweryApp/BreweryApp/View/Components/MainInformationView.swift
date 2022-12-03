//
//  MainInformationView.swift
//  BreweryApp
//
//  Created by uitleen on 01/04/2022.
//

import SwiftUI

struct MainInformationView: View {
    var brewery: Brewery
    
    var body: some View {
        VStack {
            Text(brewery.name)
                .font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
                .padding([.top, .leading, .trailing])
            Spacer()
            Text("Brewery type: \(brewery.brewery_type)")
                .foregroundColor(.secondary)
        }
    }
}

struct MainInformationView_Previews: PreviewProvider {
    static var previews: some View {
        MainInformationView(brewery: BreweryExample[0])
    }
}

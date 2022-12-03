//
//  ContentView.swift
//  BreweryApp
//
//  Created by Tim Kaerts on 23/03/2022.
//

import SwiftUI

struct ContentView: View {
    @StateObject var breweryController = BreweryController()
    @AppStorage("tapCount") private var breweryCount = 0
    
    var body: some View {
        ZStack {
            NavigationView {
                List {
                    ForEach(breweryController.breweries, id: \.self) { brewery in
                        NavigationLink (
                            destination: BreweryDetail(brewery: brewery, breweryCount: $breweryCount)
                        ) { BingeRow(brewery: brewery) }
                    }
                }
                .navigationBarTitle("Breweries")
                .onAppear {
                    breweryController.fetch()
                }
                .toolbar {
                    HStack {
                        Button("Clear count") {
                            breweryCount = 0
                        }
                        Text("Brewery count: \(breweryCount)")
                    }
                }
                WelcomeView()
            }
            .phoneOnlyNavigationView()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
.previewInterfaceOrientation(.portrait)
    }
}

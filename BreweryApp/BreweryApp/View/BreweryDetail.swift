//
//  BreweryDetail.swift
//  BreweryApp
//
//  Created by Tim Kaerts on 24/03/2022.
//

import SwiftUI
import MapKit

struct BreweryDetail: View {
    var brewery: Brewery
    let mapHeight: CGFloat = 300
    
    @State var showAlert = false
    
    @Binding var breweryCount: Int
    @Environment(\.verticalSizeClass) var sizeClass
    
    var body: some View {
        ScrollView {
                VStack {
                    if sizeClass == .regular {
                        ImageHeader()
                    }
                    MainInformationView(brewery: brewery)
                    Spacer()
                    if let lat = brewery.latitude, let doubleLat = Double(lat),
                       let long = brewery.longitude, let doubleLong = Double(long)
                    {
                        MapView(coordinate: CLLocationCoordinate2DMake(doubleLat, doubleLong))
                            .frame(height: mapHeight)
                    }
                    InformationView(brewery: brewery)
                    Button("Click here if you've been here!") {
                        breweryCount += 1
                    }
                    Text("Brewery count: \(breweryCount)")
                    NoteView(showAlert: $showAlert, brewery: brewery)
                }
                .alert(isPresented: $showAlert, content: {
                    Alert(title: Text("Your note has been stored"))
                })
            }
        .navigationTitle(brewery.name)
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct BreweryDetail_Previews: PreviewProvider {
    static var previews: some View {
        BreweryDetail(brewery: BreweryExample[0], breweryCount: .constant(0))
    }
}

//
//  ImageHeader.swift
//  BreweryApp
//
//  Created by uitleen on 29/03/2022.
//

import SwiftUI

struct ImageHeader: View {
    var body: some View {
        VStack {
            Image("beer")
                .resizable()
                .scaledToFit()
        }
    }
}

struct ImageHeader_Previews: PreviewProvider {
    static var previews: some View {
        ImageHeader()
    }
}

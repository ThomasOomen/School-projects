//
//  PhoneOnlyNavigationExtension.swift
//  BreweryApp
//
//  Created by uitleen on 29/03/2022.
//

import SwiftUI

extension View {
    @ViewBuilder func phoneOnlyNavigationView() -> some View {
        if UIDevice.current.userInterfaceIdiom == .phone {
            self.navigationViewStyle(.stack)
        } else {
            self
        }
    }
}

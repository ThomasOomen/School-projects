// From: https://developer.apple.com/tutorials/swiftui/
import SwiftUI
import MapKit

struct MapView: View {
    var coordinate: CLLocationCoordinate2D
    @State private var region = MKCoordinateRegion()

    var body: some View {
        Map(coordinateRegion: $region)
            .onAppear {
                setRegion(coordinate)
            }
    }

    private func setRegion(_ coordinate: CLLocationCoordinate2D) {
        region = MKCoordinateRegion(
            center: coordinate,
            span: MKCoordinateSpan(
                latitudeDelta: 0.2,
                longitudeDelta: 0.2)
        )
    }
}
// swiftlint:disable vertical_whitespace



























struct MapView_Previews: PreviewProvider {
    static var previews: some View {
        MapView(coordinate:
            CLLocationCoordinate2D( // Avans but does not show in preview
                latitude: 51.688521, longitude: 5.286698))
    }
}

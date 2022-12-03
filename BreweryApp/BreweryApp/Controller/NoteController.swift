//
//  NoteController.swift
//  BreweryApp
//
//  Created by uitleen on 30/03/2022.
//

import Foundation

func constructFileUrl(fileName: String) -> URL? {
    var documentDirectory: URL?
    do {
        documentDirectory = try FileManager.default.url(
            for: .documentDirectory,
               in: .userDomainMask,
               appropriateFor: nil,
               create: false)
    } catch {}
    if let documentDirectory = documentDirectory {
        return documentDirectory.appendingPathComponent(fileName)
    }
    return nil
}

func save(brewery: Brewery, noteContent: String) {
    guard let fileURL = constructFileUrl(fileName: "\(brewery.name).txt") else {
        return
    }
    do {
        try noteContent.write(to: fileURL, atomically: true, encoding: String.Encoding.unicode)
    } catch {}
}

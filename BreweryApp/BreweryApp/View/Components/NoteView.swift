//
//  NoteView.swift
//  BreweryApp
//
//  Created by uitleen on 01/04/2022.
//

import SwiftUI

struct NoteView: View {
    @State var noteContent = "Type here a note for this brewery :)"
    @State var fontSize = 17.0
    @Binding var showAlert: Bool
    
    let textEditorHeight: CGFloat = 200
    var fontName = "Noteworthy-Bold"
    
    var brewery: Brewery
    
    var body: some View {
        VStack {
            editorView
            Button(action: saveNote) { Text("save") }
        }
    }
    
    var editorView: some View {
        TextEditor(text: $noteContent)
            .padding()
            .font(.custom(fontName, size: CGFloat(fontSize)))
            .colorMultiply(Color("FlexTextBackgroundColor"))
            .frame(height: textEditorHeight)
    }
    
    func saveNote() {
        save(brewery: brewery, noteContent: noteContent)
        showAlert = true
    }
}

struct NoteView_Previews: PreviewProvider {
    static var previews: some View {
        NoteView(showAlert: .constant(false), brewery: BreweryExample[0])
    }
}

//
//  ContentView.swift
//  Shared
//
//  Created by Albert Martínez Genís on 22/3/21.
//

import SwiftUI

struct ContentView: View {
    
    // Attributes
    @State private var selection = 0
    
    var body: some View {
        TabView(selection: $selection) {
            Text("Dashboard").tabItem {
                Text("Dashboard")
            }.tag(0)
            Text("My cars").tabItem {
                Text("My cars")
            }.tag(1)
            Text("My tracks").tabItem {
                Text("My tracks")
            }.tag(2)
            Text("Settings").tabItem {
                Text("Settings")
            }.tag(3)
            Text("About").tabItem {
                Text("About")
            }.tag(3)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

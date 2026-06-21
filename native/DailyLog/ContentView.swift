import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            Text("기록 화면 (곧 만들 거예요)")
                .tabItem { Label("기록", systemImage: "square.and.pencil") }
            Text("일기 화면")
                .tabItem { Label("일기", systemImage: "book") }
            Text("검색 화면")
                .tabItem { Label("검색", systemImage: "magnifyingglass") }
        }
    }
}

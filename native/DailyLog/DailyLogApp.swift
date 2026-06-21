import SwiftUI
import SwiftData

@main
struct DailyLogApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: [Record.self, DiaryEntry.self])
    }
}

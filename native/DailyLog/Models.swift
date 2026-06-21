import Foundation
import SwiftData

// 기록 (유튜브/드라마/영화/책/논문/기타)
@Model
final class Record {
    var kind: String          // youtube, drama, movie, book, paper, etc
    var title: String
    var creator: String?
    var detail: String?       // 드라마 회차 등
    var urlString: String?
    var thumbnail: String?    // 대표 이미지 URL
    var rating: Int           // 0~5
    var dateString: String    // yyyy-MM-dd
    var memo: String?
    @Attribute(.externalStorage) var photos: [Data]
    var createdAt: Date

    init(kind: String = "youtube", title: String = "") {
        self.kind = kind
        self.title = title
        self.rating = 0
        self.dateString = Self.today()
        self.photos = []
        self.createdAt = Date()
    }

    static func today() -> String {
        let f = DateFormatter(); f.dateFormat = "yyyy-MM-dd"
        return f.string(from: Date())
    }
}

// 일기 (날짜별)
@Model
final class DiaryEntry {
    var dateString: String
    var content: String
    @Attribute(.externalStorage) var photos: [Data]
    var updatedAt: Date

    init(dateString: String, content: String = "") {
        self.dateString = dateString
        self.content = content
        self.photos = []
        self.updatedAt = Date()
    }
}

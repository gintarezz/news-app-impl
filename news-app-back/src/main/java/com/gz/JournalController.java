package com.gz;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class JournalController {

	// article details log
	@PostMapping("/logArticle")
	public void getClickedArticle(@RequestBody Article article) {
		log.info("Article details: \n title: {} \n description: {} \n url: {} \n image: {} \n published: {}",
				article.getTitle(), article.getDescription(), article.getUrl(), article.getImage(),
				article.getPublishedAt());
	}

	// search keywords log
	@PostMapping("/logSearch")
	public void getSearchKeywords(@RequestBody String keyword) {
		log.info("Search request of: {}", keyword);
	}
}

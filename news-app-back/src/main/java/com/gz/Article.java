package com.gz;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Article {

	private String title;
	private String description;
	private String url;
	private String image;
	private String publishedAt;
}

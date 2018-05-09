package ch.heiafr.arsi.g6.hashcode.controller;

import org.apache.tika.Tika;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/files")
public class FileController {

  @GetMapping("/{name}")
  public ResponseEntity<Resource> download(@PathVariable String name) throws IOException {
    Path path = Paths.get("files", name);
    ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

    HttpHeaders headers = new HttpHeaders();
    headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + name);

    Tika tika = new Tika();

    return ResponseEntity.ok()
        .headers(headers)
        .contentLength(path.toFile().length())
        .contentType(MediaType.parseMediaType(tika.detect(path)))
        .body(resource);
  }
}

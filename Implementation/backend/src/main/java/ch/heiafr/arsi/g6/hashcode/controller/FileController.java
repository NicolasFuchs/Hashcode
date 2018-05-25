package ch.heiafr.arsi.g6.hashcode.controller;

import ch.heiafr.arsi.g6.hashcode.model.Solution;
import ch.heiafr.arsi.g6.hashcode.service.ISolutionService;
import org.apache.tika.Tika;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/files")
public class FileController {

    private final ISolutionService solutionService;

    public FileController(ISolutionService solutionService) {
        this.solutionService = solutionService;
    }

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

  @PostMapping
  @PreAuthorize("isAuthenticated()")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void uploadFile(@RequestBody Solution solution) {
      try {
          String partSeparator = ",";
          if (solution.getSolution().contains(partSeparator)) {
              String encodedImg = solution.getSolution().split(partSeparator)[1];
              byte[] decodedImg = Base64.getDecoder().decode(encodedImg.getBytes(StandardCharsets.UTF_8));
              this.solutionService.createSolution(solution);
              Path destinationFile = Paths.get("files", solution.getSolutionId() + "_" + solution.getName());
              Files.write(destinationFile, decodedImg);
          }
      } catch (IOException e) {
          e.printStackTrace();
      }
  }
}

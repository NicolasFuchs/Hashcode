package ch.heiafr.arsi.g6.hashcode.helper;

import org.springframework.core.io.ClassPathResource;
import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class XSDValidatorHelper {

  public static void validateXML(String xmlStr) {
    try {
      SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
      Schema schema =
          schemaFactory.newSchema(new ClassPathResource("address_schema.xsd").getFile());
      Validator validator = schema.newValidator();
      validator.validate(
          new StreamSource(new ByteArrayInputStream(xmlStr.getBytes(StandardCharsets.UTF_8))));
    } catch (SAXException | IOException e) {
      throw new RuntimeException("XML is not valid");
    }
  }
}

package ch.heiafr.arsi.g6.hashcode.serializer;

import ch.heiafr.arsi.g6.hashcode.model.Account;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.util.List;

public class MembersSerializer extends JsonSerializer<List<Account>> {

  @Override
  public void serialize(List<Account> value, JsonGenerator gen, SerializerProvider serializers)
      throws IOException {
    gen.writeStartArray();
    for (Account account : value) {
      gen.writeStartObject();
      gen.writeNumberField("accountId", account.getAccountId());
      gen.writeStringField("firstname", account.getFirstname());
      gen.writeStringField("lastname", account.getLastname());
      gen.writeStringField("email", account.getEmail());
      gen.writeStringField("pseudo", account.getPseudo());
      gen.writeStringField("image", account.getImage());
      gen.writeEndObject();
    }
    gen.writeEndArray();
  }
}

package ch.heiafr.arsi.g6.hashcode.serializer;

import ch.heiafr.arsi.g6.hashcode.model.Account;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class OnlyAccountIdSerializer extends JsonSerializer<Account> {

  @Override
  public void serialize(Account value, JsonGenerator gen, SerializerProvider serializers)
      throws IOException {
    gen.writeNumber(value.getAccountId());
  }
}

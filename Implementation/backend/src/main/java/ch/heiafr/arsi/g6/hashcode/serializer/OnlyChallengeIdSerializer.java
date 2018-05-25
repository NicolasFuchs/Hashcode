package ch.heiafr.arsi.g6.hashcode.serializer;

import ch.heiafr.arsi.g6.hashcode.model.Challenge;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class OnlyChallengeIdSerializer extends JsonSerializer<Challenge> {

  @Override
  public void serialize(Challenge value, JsonGenerator gen, SerializerProvider serializers)
      throws IOException {
    gen.writeNumber(value.getChallengeId());
  }
}

import { useState } from "react";
import { useRouter } from "next/router";

import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function RegisterRestaurant() {
  const [errorMessage, setErrorMessage] = useState("");

  const supabase = useSupabaseClient();
  const router = useRouter();

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [address, setAddress] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitLoading(true);
    const formData = new FormData(e.target);

    try {
      const geocodeResult = await geocodeByAddress(address);
      const latLng = await getLatLng(geocodeResult[0]);

      const signupResponse = await fetch("/api/signup-restaurant", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
          name: formData.get("restaurant-name"),
          latitude: latLng.lat,
          longitude: latLng.lng,
          address: formData.get("restaurant-address"),
        }),
      });
      if (signupResponse.ok) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.get("email"),
          password: formData.get("password"),
        });
        setIsSubmitLoading(false);

        if (data) router.push(`/restaurant/${data.session.user.id}`);
      } else {
        const { error } = await signupResponse.json();
        setErrorMessage(error.message);
      }
    } catch (e) {
      setErrorMessage(e);
    }
  };

  return (
    <div>
      <Flex alignItems="center" minH="100vh" h="100%">
        <Container>
          <FormControl as="form" onSubmit={onSubmit}>
            <FormLabel htmlFor="input-restaurant-name">
              Restaurant Name:
            </FormLabel>
            <Input id="input-restaurant-name" name="restaurant-name" required />

            <FormLabel htmlFor="input-restaurant-address">
              Restaurant Address:
            </FormLabel>
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={setAddress}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <Input
                    id="input-restaurant-address"
                    name="restaurant-address"
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "location-search-input",
                    })}
                    required
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          key={suggestion.description}
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>

            <FormLabel htmlFor="input-email">Email:</FormLabel>
            <Input type="email" id="input-email" name="email" required />

            <FormLabel htmlFor="input-password">Password:</FormLabel>
            <Input
              type="password"
              id="input-password"
              name="password"
              required
            />

            <Button type="submit" isLoading={isSubmitLoading}>
              Register Restaurant
            </Button>
          </FormControl>
          <Text>{errorMessage}</Text>
        </Container>
      </Flex>
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API}&libraries=places`}
      ></script>
    </div>
  );
}

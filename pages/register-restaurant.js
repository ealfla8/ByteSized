import { useState } from "react";
import { useRouter } from "next/router";

import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Button,
  Heading,
  VStack
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

        if (data) await router.push(`/restaurant/${data.session.user.id}`);
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
      <Flex
          bgColor="gray.700"
          alignItems="center"
          justifyContent="center"
          minH="100vh"
          h="100%"
      >
        <Flex
            direction="column"
            bgColor="gray.50"
            padding={7}
            rounded={50}
            position="relative"
            width="50%"
            textColor="gray.700"
        >
          <VStack spacing={5} mt={5} mb={5}>
            <Heading size="xl">A Second Chance</Heading>
            <Heading size="md">Restaurant Registration</Heading>
            <FormControl
                as="form"
                onSubmit={onSubmit}
                width="70%"
                variant="outline"
            >
              <VStack spacing={7}>
                <FormControl variant="floating">
                  <Input
                      placeholder=" "
                      type="text"
                      id="input-restaurant-name"
                      name="restaurant-name"
                      required
                  />
                  <FormLabel>Name</FormLabel>
                </FormControl>
                <FormControl variant="floating">
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
                          placeholder=" "
                          type="search"
                          id="input-restaurant-address"
                          name="restaurant-address"
                          {...getInputProps({
                            className: "location-search-input",
                          })}
                          required
                      />
                      <FormLabel>Address</FormLabel>
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                              ? { cursor: "pointer" }
                              : { cursor: "pointer" };
                          return (
                              <div
                                  key={suggestion.description}
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style
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
                </FormControl>
                <FormControl variant="floating">
                  <Input
                      placeholder=" "
                      type="email"
                      id="input-email"
                      name="email"
                      required
                  />
                  <FormLabel>Email</FormLabel>
                </FormControl>

                <FormControl variant="floating">
                  <Input
                      placeholder=" "
                      type="password"
                      id="input-password"
                      name="password"
                      required
                  />
                  <FormLabel>Password</FormLabel>
                </FormControl>

                <Button type="submit" isLoading={isSubmitLoading}>
                  Create Account
                </Button>
              </VStack>
            </FormControl>
            <Text fontSize="xs" color="red.500">{errorMessage}</Text>
          </VStack>
        </Flex>
      </Flex>
      <script
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API}&libraries=places`}
      ></script>
    </div>
  );
}

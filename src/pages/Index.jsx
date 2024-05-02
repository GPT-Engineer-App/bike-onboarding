import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Heading, Text, VStack, Progress, useToast } from "@chakra-ui/react";
import { FaBicycle, FaUser, FaBell } from "react-icons/fa";

const Index = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bikeModel: "",
    serialNumber: "",
    receiveNotifications: false,
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form data
      toast({
        title: "Onboarding Complete",
        description: "Welcome to the Digital Bike Workshop!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={4} align="stretch">
        <Heading>Welcome to the Digital Bike Workshop!</Heading>
        <Text>Step {step} of 3</Text>
        <Progress value={(step / 3) * 100} size="sm" colorScheme="green" />

        {step === 1 && (
          <VStack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="fullName">Full Name</FormLabel>
              <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </FormControl>
          </VStack>
        )}

        {step === 2 && (
          <VStack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="bikeModel">Bike Model</FormLabel>
              <Input id="bikeModel" name="bikeModel" value={formData.bikeModel} onChange={handleInputChange} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="serialNumber">Serial Number</FormLabel>
              <Input id="serialNumber" name="serialNumber" value={formData.serialNumber} onChange={handleInputChange} />
            </FormControl>
          </VStack>
        )}

        {step === 3 && (
          <VStack spacing={4}>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="receiveNotifications" mb="0">
                Receive Notifications
              </FormLabel>
              <Input id="receiveNotifications" name="receiveNotifications" type="checkbox" checked={formData.receiveNotifications} onChange={handleInputChange} />
            </FormControl>
          </VStack>
        )}

        <Box pt={4}>
          <Button colorScheme="teal" mr={3} onClick={prevStep} isDisabled={step === 1}>
            Previous
          </Button>
          <Button colorScheme="teal" onClick={nextStep}>
            {step === 3 ? "Finish" : "Next"}
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;

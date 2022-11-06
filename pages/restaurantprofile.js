import { Image, Input, Button, Divider} from '@chakra-ui/react'


export default function RestaurantRegistration() {
	return (<div>
		Example Restaurant Profile 

	<Image
		borderRadius='full'
		boxSize='150px'
		src='https://st.depositphotos.com/1064950/1282/i/950/depositphotos_12829992-stock-photo-restaurant-signage.jpg'
		alt='Example Restaurant Picture'
	/>

	Example Restaurant Name 

	<Divider orientation='horizontal' /*the divider is because I don't know how to add spacing*/ />                 

	<Button colorScheme='blue'>Edit Profile</Button>
	<Divider orientation='horizontal' />                   
	<Button colorScheme='blue'>Followers</Button>	
	<Divider orientation='horizontal' />                   
	<Button colorScheme='blue'>Write a post..</Button>	
	<Divider orientation='horizontal' />                   
	<Divider orientation='horizontal' />                   
	<Input placeholder='Type your post here!' size='md' />





		</div>
	)
} 

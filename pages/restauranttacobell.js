import { Image, Input, Button, Divider, Heading} from '@chakra-ui/react'

export default function RestaurantRegistration() {
	return (<div>
	<Heading> Taco Bell Profile </Heading>

	<Image
		boxSize='200px'
		objectFit = 'cover'
		src='https://cdn.mos.cms.futurecdn.net/hgRu36yguybcDeZLsZybEA-1200-80.jpg'
		alt='Example Restaurant Picture'
	/>

	<Divider orientation='horizontal' /*the divider is because I don't know how to add spacing*/ />                 

	<Button colorScheme='blue'>Edit Profile</Button>
	<Divider orientation='horizontal' /> 

	<Button colorScheme='blue'>Followers</Button>	
	<Divider orientation='horizontal' />                   
	<Button colorScheme='blue'>Write a post..</Button>	
	<Divider orientation='horizontal' />                   
	<Divider orientation='horizontal' />                   
	<Input placeholder='Type your post here!' size='md' />
	<Button colorScheme='blue'>Post</Button>

		</div>
	)
} 

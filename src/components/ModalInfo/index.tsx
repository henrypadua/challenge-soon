import { Alert } from 'react-native';

import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useMap } from '@hooks/useMap';
import {
	Avatar,
	Button,
	Fab,
	HStack,
	Icon,
	IconButton,
	Image,
	Modal,
	Text,
	VStack,
} from 'native-base';

type ModalInfoProps = {
	openModal: boolean;
	setOpenModal: (value: boolean) => void;
};

export function ModalInfo({ openModal, setOpenModal }: ModalInfoProps) {
	const {
		setOrigin,
		setDestination,
		originPlace,
		destinationPlace,
		infoRoute,
		setInfoRoute,
		setDestinationPlace,
		setOriginPlace,
	} = useMap();

	function handleCancelRequest() {
		setOpenModal(false);
		setOrigin(null);
		setDestination(null);
		setDestinationPlace(null);
		setOriginPlace(null);
		setInfoRoute({
			distance: 0,
			duration: 0,
		});
	}

	return (
		<>
			<Modal
				isOpen={openModal}
				onClose={() => setOpenModal(false)}
				justifyContent="flex-end"
				bottom="4"
				size="xl"
				_backdrop={{
					opacity: 0.1,
				}}
			>
				<Fab
					onPress={() => {
						setOpenModal(false);
					}}
					placement="top-left"
					bgColor="#FFFFFF"
					shadow={2}
					renderInPortal={false}
					top={'32'}
					size="xs"
					style={{
						width: 44,
						height: 44,
					}}
					icon={
						<Image
							source={require('@assets/close.png')}
							style={{
								width: 30,
								height: 30,
							}}
							alt="close"
						/>
					}
				/>
				<Modal.Content>
					<Modal.Header bgColor={'#F7F7F7'}>
						<HStack
							alignContent={'center'}
							alignItems={'center'}
							justifyContent="space-evenly"
						>
							<Avatar
								w={'50px'}
								source={require('@assets/avatar.png')}
							/>
							<VStack alignItems="flex-start">
								<Text
									fontSize="md"
									color="#242E42"
									fontFamily={'heading'}
								>
									Gregory Smith
								</Text>
								<HStack alignContent={'center'} alignItems={'center'}>
									<Icon
										as={MaterialCommunityIcons}
										name="star"
										color="#FFC107"
									/>
									<Text
										fontSize="sm"
										color="#C8C7CC"
										fontFamily={'body'}
									>
										4.9
									</Text>
								</HStack>
							</VStack>
							<HStack
								alignContent={'center'}
								alignItems={'center'}
								space={4}
							>
								<IconButton
									icon={
										<Icon
											as={Ionicons}
											name="chatbubble-ellipses"
											color="#FFFFFF"
											size={'lg'}
										/>
									}
									ml="auto"
									rounded="full"
									bgColor={'#4252FF'}
									onPress={() => Alert.alert('Chat')}
								/>
								<IconButton
									icon={
										<Icon
											as={Ionicons}
											name="call"
											color="#FFFFFF"
											size={'lg'}
										/>
									}
									variant="solid"
									ml="auto"
									rounded="full"
									bgColor={'#4CE5B1'}
									onPress={() => Alert.alert('Phone')}
								/>
							</HStack>
						</HStack>
					</Modal.Header>
					<Modal.Body>
						<VStack flex={1} px={2}>
							<HStack alignContent={'center'} alignItems={'center'}>
								<Image
									source={require('@assets/point.png')}
									alt="circle"
								/>
								<Text
									fontSize="sm"
									color="#242E42"
									fontFamily={'heading'}
									ml={4}
								>
									{originPlace?.data?.description}
								</Text>
							</HStack>

							<Image
								source={require('@assets/line.png')}
								alt="line"
								left={2}
							/>

							<HStack alignContent={'center'} alignItems={'center'}>
								<Image
									source={require('@assets/oval.png')}
									alt="square"
								/>
								<Text
									fontSize="sm"
									color="#242E42"
									fontFamily={'heading'}
									ml={4}
								>
									{destinationPlace?.data?.description}
								</Text>
							</HStack>
						</VStack>
					</Modal.Body>
					<Modal.Footer>
						<VStack flex={1}>
							<HStack space={5} alignItems={'center'} py={6}>
								<Image
									source={require('@assets/car-black.png')}
									alt="car"
								/>

								<VStack alignItems={'center'}>
									<Text color={'#C8C7CC'} fontSize={'sm'}>
										DISTANCE
									</Text>
									<Text
										color={'#242E42'}
										fontSize={'md'}
										fontFamily={'heading'}
									>
										{infoRoute.distance.toFixed(1)}km
									</Text>
								</VStack>

								<VStack alignItems={'center'}>
									<Text
										color={'#C8C7CC'}
										fontSize={'sm'}
										fontFamily={'heading'}
									>
										TIME
									</Text>
									<Text
										color={'#242E42'}
										fontSize={'md'}
										fontFamily={'heading'}
									>
										{new Date(infoRoute.duration * 1000 * 60)
											.toISOString()
											.substring(11, 19)}
									</Text>
								</VStack>

								<VStack alignItems={'center'}>
									<Text color={'#C8C7CC'} fontSize={'sm'}>
										PRICE
									</Text>
									<Text
										color={'#242E42'}
										fontSize={'md'}
										fontFamily={'heading'}
									>
										${(infoRoute.distance * 4.2).toFixed(2)}
									</Text>
								</VStack>
							</HStack>
							<Button
								onPress={() => {
									handleCancelRequest();
								}}
								bgColor={'#242E42'}
								borderRadius={8}
							>
								<Text
									color={'#fff'}
									fontSize={'md'}
									fontFamily={'heading'}
								>
									Cancel Request
								</Text>
							</Button>
						</VStack>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</>
	);
}

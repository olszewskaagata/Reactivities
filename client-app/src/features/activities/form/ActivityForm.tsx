import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button,  FormField,  Header,  Label,  Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from "uuid";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/modules/activity';


export default observer(function ActivityForm() {

	const {activityStore} = useStore();
	const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
	const {id} = useParams<{id: string}>();
	const [activity, setActivity] = useState<Activity>({
		id: '',
		title: '',
		date: null,
		category: '',
		description: '',
		city: '',
		venue: ''
	});

	const validationSchema = Yup.object({
		title: Yup.string().required('The activity title is required'),
		description: Yup.string().required('The activity description is required'),
		category: Yup.string().required(),
		date: Yup.string().required(),
		vanue: Yup.string().required(),
		city: Yup.string().required()
	})

	useEffect(() => {
		if(id) loadActivity(id).then(activity => setActivity(activity!));
	}, [id, loadActivity]);

	function handleFormSubmit(activity: Activity) {
		if (activity.id.length === 0) {
			let newActivity = {
				...activity,
				id: uuid()
			}
			createActivity(newActivity);
		} else updateActivity(activity);
	}

	if(loadingInitial) return <LoadingComponent content="Loading activity..."/>

	return (
		<Segment clearing>
			<Header content='Activity Details' sub color='teal'/>
			<Formik validationSchema={validationSchema}
			 enableReinitialize initialValues={activity} onSubmit={values => handleFormSubmit(values)}>
				{({handleSubmit, isValid, isSubmitting, dirty}) => (
					<Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
						<MyTextInput name='title' placeholder= 'Title'></MyTextInput>
						<MyTextArea rows={3} placeholder='Description' name='description' />
						<MySelectInput options={categoryOptions} placeholder='Category' name='category' />
						<MyDateInput placeholderText='Date' name='date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa'/>
						<Header content='Location Details' sub color='teal'/>
						<MyTextInput placeholder='City'  name='city' />
						<MyTextInput placeholder='Venue' name='venue'  />
						<Button 
							disabled={isSubmitting || !dirty || !isValid}
							loading={loading} 
							floated='right' 
							positive 
							type='submit' 
							content='Submit' />
						<Button floated='right' type='button' content='Cancel' />
					</Form>
				)}
			</Formik>
		</Segment>
		)
})
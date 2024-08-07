import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/projects/projectsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const ProjectsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.projects);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View projects')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View projects')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ProjectName</p>
            <p>{projects?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            {projects.description ? (
              <p dangerouslySetInnerHTML={{ __html: projects.description }} />
            ) : (
              <p>No data</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Owner</p>

            <p>{projects?.owner?.firstName ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Tasks Project</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>

                      <th>Description</th>

                      <th>Status</th>

                      <th>StartDate</th>

                      <th>EndDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.tasks_project &&
                      Array.isArray(projects.tasks_project) &&
                      projects.tasks_project.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/tasks/tasks-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='title'>{item.title}</td>

                          <td data-label='description'>{item.description}</td>

                          <td data-label='status'>{item.status}</td>

                          <td data-label='start_date'>
                            {dataFormatter.dateTimeFormatter(item.start_date)}
                          </td>

                          <td data-label='end_date'>
                            {dataFormatter.dateTimeFormatter(item.end_date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!projects?.tasks_project?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/projects/projects-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

ProjectsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PROJECTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default ProjectsView;

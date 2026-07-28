import * as yup from 'yup';
import prisma from '~/lib/prisma';

interface NavbarSocialLinkInput {
  name?: string;
  url?: string;
}

interface NavbarContactsInput {
  phone?: string;
  mail?: string;
  address?: string;
}

interface NavbarInput {
  sectionName?: string;
  logo?: string;
  contacts?: NavbarContactsInput[];
  socialLinks?: NavbarSocialLinkInput[];
}

const navbarSocialLinkSchema = yup.object({
  name: yup.string().trim().notRequired(),
  url: yup.string().trim().notRequired(),
});

const navbarContactsSchema = yup.object({
  phone: yup.string().trim().notRequired(),
  mail: yup.string().trim().notRequired(),
  address: yup.string().trim().notRequired(),
});

const navbarSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  logo: yup.string().trim().notRequired(),
  contacts: yup.array().of(navbarContactsSchema).notRequired(),
  socialLinks: yup.array().of(navbarSocialLinkSchema).notRequired(),
});

const navbarDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    // Get the first Navbar record with sectionName "navbars" including all related data
    const navbarData = await prisma.navbar.findFirst({
      where: { sectionName: "navbars" },
      include: {
        socialLinks: true,
        contacts: true,
      },
    });
    return navbarData;
  } else if (method === 'POST') {
    // Create a new Navbar record
    const rawBody = await readBody(event);
    const validation = await validateOrError<NavbarInput>(navbarSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    const socialLinksData = Array.isArray(body.socialLinks)
      ? body.socialLinks.map(link => ({ name: link.name, url: link.url }))
      : [];
    const contactsData = Array.isArray(body.contacts)
      ? body.contacts.map(contact => ({ 
          phone: contact.phone, 
          mail: contact.mail, 
          address: contact.address 
        }))
      : [];

    const newNavbar = await prisma.navbar.create({
      data: {
        sectionName: body.sectionName || "navbars",
        logo: body.logo,
        createdAt: new Date(),
        socialLinks: { create: socialLinksData },
        contacts: { create: contactsData },
      },
      include: {
        socialLinks: true,
        contacts: true,
      },
    });
    return newNavbar;
  } else if (method === 'PUT') {
    // Update the Navbar record with specified sectionName
    const rawBody = await readBody(event);
    const validation = await validateOrError<NavbarInput>(navbarSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    try {
      const socialLinksData = Array.isArray(body.socialLinks)
        ? body.socialLinks.map(link => ({ name: link.name, url: link.url }))
        : [];
      const contactsData = Array.isArray(body.contacts)
        ? body.contacts.map(contact => ({ 
            phone: contact.phone, 
            mail: contact.mail, 
            address: contact.address 
          }))
        : [];

      const updatedNavbar = await prisma.navbar.update({
        where: { sectionName: body.sectionName || "navbars" },
        data: {
          logo: body.logo,
          // Update related data: first delete existing, then create new ones
          socialLinks: {
            deleteMany: {},
            create: socialLinksData,
          },
          contacts: {
            deleteMany: {},
            create: contactsData,
          },
        },
        include: {
          socialLinks: true,
          contacts: true,
        },
      });
      return { success: true, data: updatedNavbar };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }
  } else if (method === 'DELETE') {
    // Delete the Navbar record with specified sectionName
    const rawBody = await readBody(event);
    const validation = await validateOrError<{ sectionName?: string }>(navbarDeleteSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    const deletedNavbar = await prisma.navbar.delete({
      where: { sectionName: body.sectionName || "navbars" },
    });
    return deletedNavbar;
  } else {
    return { error: `HTTP ${method} method is not supported.` };
  }
});
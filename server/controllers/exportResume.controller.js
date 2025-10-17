import Resume from "../models/resume.model.js";
import PDFDocument from 'pdfkit';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import fs from 'fs';
import path from 'path';

// POST: /api/export/pdf/:resumeId
export const exportToPDF = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.userId;

        const resume = await Resume.findOne({
            _id: resumeId,
            userId: userId
        });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        // Create PDF
        const doc = new PDFDocument({ 
            size: 'A4',
            margins: { top: 50, bottom: 50, left: 50, right: 50 }
        });

        // Set response headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${resume.title || 'resume'}.pdf"`);

        doc.pipe(res);

        // Header - Name and Contact
        doc.fontSize(24)
           .fillColor(resume.accent_color || '#3B82F6')
           .text(resume.personal_info.full_name || 'Your Name', { align: 'center' });

        doc.fontSize(14)
           .fillColor('#666666')
           .text(resume.personal_info.profession || 'Your Profession', { align: 'center' });

        doc.moveDown(0.5);
        doc.fontSize(10)
           .fillColor('#333333')
           .text([
               resume.personal_info.email,
               resume.personal_info.phone,
               resume.personal_info.location
           ].filter(Boolean).join(' | '), { align: 'center' });

        doc.moveDown(1);

        // Professional Summary
        if (resume.professional_summary) {
            doc.fontSize(16)
               .fillColor(resume.accent_color || '#3B82F6')
               .text('PROFESSIONAL SUMMARY', { underline: true });
            
            doc.moveDown(0.3);
            doc.fontSize(11)
               .fillColor('#333333')
               .text(resume.professional_summary, { align: 'justify' });
            
            doc.moveDown(1);
        }

        // Skills
        if (resume.skills && resume.skills.length > 0) {
            doc.fontSize(16)
               .fillColor(resume.accent_color || '#3B82F6')
               .text('SKILLS', { underline: true });
            
            doc.moveDown(0.3);
            doc.fontSize(11)
               .fillColor('#333333')
               .text(resume.skills.join(' • '), { align: 'left' });
            
            doc.moveDown(1);
        }

        // Experience
        if (resume.experience && resume.experience.length > 0) {
            doc.fontSize(16)
               .fillColor(resume.accent_color || '#3B82F6')
               .text('EXPERIENCE', { underline: true });
            
            doc.moveDown(0.5);

            resume.experience.forEach((exp, index) => {
                doc.fontSize(13)
                   .fillColor('#333333')
                   .text(exp.position || 'Position', { continued: true })
                   .fontSize(11)
                   .text(` at ${exp.company || 'Company'}`, { continued: false });

                doc.fontSize(10)
                   .fillColor('#666666')
                   .text(`${exp.start_date || 'Start'} - ${exp.is_current ? 'Present' : exp.end_date || 'End'}`);

                if (exp.description) {
                    doc.moveDown(0.3);
                    doc.fontSize(10)
                       .fillColor('#333333')
                       .text(exp.description, { align: 'justify' });
                }

                if (index < resume.experience.length - 1) {
                    doc.moveDown(0.7);
                }
            });

            doc.moveDown(1);
        }

        // Projects
        if (resume.project && resume.project.length > 0) {
            doc.fontSize(16)
               .fillColor(resume.accent_color || '#3B82F6')
               .text('PROJECTS', { underline: true });
            
            doc.moveDown(0.5);

            resume.project.forEach((proj, index) => {
                doc.fontSize(13)
                   .fillColor('#333333')
                   .text(proj.name || 'Project Name');

                if (proj.type) {
                    doc.fontSize(10)
                       .fillColor('#666666')
                       .text(proj.type);
                }

                if (proj.description) {
                    doc.moveDown(0.3);
                    doc.fontSize(10)
                       .fillColor('#333333')
                       .text(proj.description, { align: 'justify' });
                }

                if (index < resume.project.length - 1) {
                    doc.moveDown(0.7);
                }
            });

            doc.moveDown(1);
        }

        // Education
        if (resume.education && resume.education.length > 0) {
            doc.fontSize(16)
               .fillColor(resume.accent_color || '#3B82F6')
               .text('EDUCATION', { underline: true });
            
            doc.moveDown(0.5);

            resume.education.forEach((edu, index) => {
                doc.fontSize(13)
                   .fillColor('#333333')
                   .text(edu.degree || 'Degree');

                doc.fontSize(11)
                   .fillColor('#666666')
                   .text(`${edu.institution || 'Institution'} | ${edu.graduation_date || 'Year'}`);

                if (edu.field) {
                    doc.fontSize(10)
                       .text(`Field: ${edu.field}`);
                }

                if (edu.gpa) {
                    doc.fontSize(10)
                       .text(`GPA: ${edu.gpa}`);
                }

                if (index < resume.education.length - 1) {
                    doc.moveDown(0.7);
                }
            });
        }

        doc.end();

        // Save export history
        resume.export_history.push({
            format: 'pdf',
            exported_at: new Date()
        });
        await resume.save();

    } catch (error) {
        console.error("PDF Export Error:", error);
        res.status(500).json({ 
            message: "Error exporting to PDF", 
            error: error.message 
        });
    }
};

// POST: /api/export/docx/:resumeId
export const exportToDOCX = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.userId;

        const resume = await Resume.findOne({
            _id: resumeId,
            userId: userId
        });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        // Create DOCX document
        const sections = [];

        // Header
        sections.push(
            new Paragraph({
                text: resume.personal_info.full_name || 'Your Name',
                heading: HeadingLevel.TITLE,
                alignment: 'center'
            }),
            new Paragraph({
                text: resume.personal_info.profession || 'Your Profession',
                alignment: 'center'
            }),
            new Paragraph({
                text: [
                    resume.personal_info.email,
                    resume.personal_info.phone,
                    resume.personal_info.location
                ].filter(Boolean).join(' | '),
                alignment: 'center'
            }),
            new Paragraph({ text: '' }) // Spacing
        );

        // Professional Summary
        if (resume.professional_summary) {
            sections.push(
                new Paragraph({
                    text: 'PROFESSIONAL SUMMARY',
                    heading: HeadingLevel.HEADING_1
                }),
                new Paragraph({
                    text: resume.professional_summary
                }),
                new Paragraph({ text: '' })
            );
        }

        // Skills
        if (resume.skills && resume.skills.length > 0) {
            sections.push(
                new Paragraph({
                    text: 'SKILLS',
                    heading: HeadingLevel.HEADING_1
                }),
                new Paragraph({
                    text: resume.skills.join(' • ')
                }),
                new Paragraph({ text: '' })
            );
        }

        // Experience
        if (resume.experience && resume.experience.length > 0) {
            sections.push(
                new Paragraph({
                    text: 'EXPERIENCE',
                    heading: HeadingLevel.HEADING_1
                })
            );

            resume.experience.forEach(exp => {
                sections.push(
                    new Paragraph({
                        text: `${exp.position || 'Position'} at ${exp.company || 'Company'}`,
                        heading: HeadingLevel.HEADING_2
                    }),
                    new Paragraph({
                        text: `${exp.start_date || 'Start'} - ${exp.is_current ? 'Present' : exp.end_date || 'End'}`
                    }),
                    new Paragraph({
                        text: exp.description || ''
                    }),
                    new Paragraph({ text: '' })
                );
            });
        }

        // Create document
        const doc = new Document({
            sections: [{
                children: sections
            }]
        });

        // Generate buffer
        const buffer = await Packer.toBuffer(doc);

        // Set headers and send
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', `attachment; filename="${resume.title || 'resume'}.docx"`);
        res.send(buffer);

        // Save export history
        resume.export_history.push({
            format: 'docx',
            exported_at: new Date()
        });
        await resume.save();

    } catch (error) {
        console.error("DOCX Export Error:", error);
        res.status(500).json({ 
            message: "Error exporting to DOCX", 
            error: error.message 
        });
    }
};

// GET: /api/export/json/:resumeId
export const exportToJSON = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.userId;

        const resume = await Resume.findOne({
            _id: resumeId,
            userId: userId
        }).lean();

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        // Remove sensitive/unnecessary fields
        delete resume._id;
        delete resume.userId;
        delete resume.__v;
        delete resume.createdAt;
        delete resume.updatedAt;

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="${resume.title || 'resume'}.json"`);
        res.json(resume);

        // Save export history
        await Resume.findByIdAndUpdate(resumeId, {
            $push: {
                export_history: {
                    format: 'json',
                    exported_at: new Date()
                }
            }
        });

    } catch (error) {
        console.error("JSON Export Error:", error);
        res.status(500).json({ 
            message: "Error exporting to JSON", 
            error: error.message 
        });
    }
};

// GET: /api/export/html/:resumeId
export const exportToHTML = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.userId;

        const resume = await Resume.findOne({
            _id: resumeId,
            userId: userId
        });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        const html = generateHTMLResume(resume);

        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Disposition', `attachment; filename="${resume.title || 'resume'}.html"`);
        res.send(html);

        // Save export history
        resume.export_history.push({
            format: 'html',
            exported_at: new Date()
        });
        await resume.save();

    } catch (error) {
        console.error("HTML Export Error:", error);
        res.status(500).json({ 
            message: "Error exporting to HTML", 
            error: error.message 
        });
    }
};

// Helper function to generate HTML
function generateHTMLResume(resume) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${resume.personal_info.full_name || 'Resume'}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 800px; 
            margin: 40px auto; 
            padding: 40px;
            background: #f5f5f5;
        }
        .container { background: white; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        header { text-align: center; border-bottom: 3px solid ${resume.accent_color || '#3B82F6'}; padding-bottom: 20px; margin-bottom: 30px; }
        h1 { color: ${resume.accent_color || '#3B82F6'}; font-size: 2.5em; margin-bottom: 10px; }
        h2 { color: ${resume.accent_color || '#3B82F6'}; font-size: 1.5em; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 5px; }
        h3 { color: #333; font-size: 1.2em; margin-top: 20px; margin-bottom: 5px; }
        .subtitle { color: #666; font-size: 1.2em; }
        .contact { color: #666; margin-top: 10px; }
        .section { margin-bottom: 25px; }
        .job-title { font-weight: bold; }
        .date { color: #666; font-style: italic; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill { background: ${resume.accent_color || '#3B82F6'}; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.9em; }
        ul { margin-left: 20px; }
        @media print { body { margin: 0; padding: 0; background: white; } .container { box-shadow: none; } }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>${resume.personal_info.full_name || 'Your Name'}</h1>
            <p class="subtitle">${resume.personal_info.profession || 'Your Profession'}</p>
            <p class="contact">
                ${[resume.personal_info.email, resume.personal_info.phone, resume.personal_info.location].filter(Boolean).join(' | ')}
            </p>
        </header>

        ${resume.professional_summary ? `
        <section class="section">
            <h2>Professional Summary</h2>
            <p>${resume.professional_summary}</p>
        </section>
        ` : ''}

        ${resume.skills && resume.skills.length > 0 ? `
        <section class="section">
            <h2>Skills</h2>
            <div class="skills">
                ${resume.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
            </div>
        </section>
        ` : ''}

        ${resume.experience && resume.experience.length > 0 ? `
        <section class="section">
            <h2>Experience</h2>
            ${resume.experience.map(exp => `
                <div style="margin-bottom: 20px;">
                    <h3>${exp.position || 'Position'} at ${exp.company || 'Company'}</h3>
                    <p class="date">${exp.start_date || 'Start'} - ${exp.is_current ? 'Present' : exp.end_date || 'End'}</p>
                    <p>${exp.description || ''}</p>
                </div>
            `).join('')}
        </section>
        ` : ''}

        ${resume.project && resume.project.length > 0 ? `
        <section class="section">
            <h2>Projects</h2>
            ${resume.project.map(proj => `
                <div style="margin-bottom: 15px;">
                    <h3>${proj.name || 'Project Name'}</h3>
                    ${proj.type ? `<p class="date">${proj.type}</p>` : ''}
                    <p>${proj.description || ''}</p>
                </div>
            `).join('')}
        </section>
        ` : ''}

        ${resume.education && resume.education.length > 0 ? `
        <section class="section">
            <h2>Education</h2>
            ${resume.education.map(edu => `
                <div style="margin-bottom: 15px;">
                    <h3>${edu.degree || 'Degree'}</h3>
                    <p>${edu.institution || 'Institution'} | ${edu.graduation_date || 'Year'}</p>
                    ${edu.field ? `<p>Field: ${edu.field}</p>` : ''}
                    ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
                </div>
            `).join('')}
        </section>
        ` : ''}
    </div>
</body>
</html>
    `;
}

// GET: /api/export/history/:resumeId
export const getExportHistory = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const userId = req.userId;

        const resume = await Resume.findOne({
            _id: resumeId,
            userId: userId
        }).select('export_history title');

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({
            title: resume.title,
            export_history: resume.export_history
        });

    } catch (error) {
        console.error("Export History Error:", error);
        res.status(500).json({ 
            message: "Error fetching export history", 
            error: error.message 
        });
    }
};